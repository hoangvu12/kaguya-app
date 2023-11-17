import { useAtom, useAtomValue, useSetAtom } from 'jotai/react';
import { styled } from 'nativewind';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import Toast from 'react-native-toast-message';
import type {
  OnBufferData,
  OnLoadData,
  OnProgressData,
  VideoProperties,
} from 'react-native-video';
import RNVideo from 'react-native-video';

import { VideoFormat } from '@/core/video';
import { getWatchedEpisode, markEpisodeAsWatched } from '@/storage/episode';
import type { Video } from '@/types';

import {
  currentEpisodeAtom,
  currentQualityAtom,
  currentSourceAtom,
  currentTimeAtom,
  durationAtom,
  isBufferingAtom,
  mediaIdAtom,
  pausedAtom,
  playableDurationAtom,
  playBackRateAtom,
  playerAtom,
  qualityListAtom,
  sourceListAtom,
  videoSizeAtom,
  volumeAtom,
} from '../store';
import type { VideoTrack } from '../types';

const StyledVideo = styled(RNVideo);

interface MediaPlayerProps extends Omit<VideoProperties, 'source'> {
  videos: Video[];
}

type VideoSource = {
  uri?: string | undefined;
  headers?:
    | {
        [key: string]: string;
      }
    | undefined;
  type?: 'mpd' | 'm3u8' | undefined;
};

const EMPTY_VIDEO: VideoSource = {
  uri: 'https://cdn.plyr.io/static/blank.mp4',
};

const MediaPlayer: React.FC<MediaPlayerProps> = ({ videos, ...props }) => {
  const playerRef = useRef<RNVideo>(null);
  const setPlayer = useSetAtom(playerAtom);

  const setPlayableDuration = useSetAtom(playableDurationAtom);
  const [currentTime, setCurrentTime] = useAtom(currentTimeAtom);
  const setDuration = useSetAtom(durationAtom);
  const setSourceList = useSetAtom(sourceListAtom);
  const setQualityList = useSetAtom(qualityListAtom);
  const setVideoSize = useSetAtom(videoSizeAtom);

  const currentEpisode = useAtomValue(currentEpisodeAtom);
  const mediaId = useAtomValue(mediaIdAtom);

  const [currentSource, setCurrentSource] = useAtom(currentSourceAtom);
  const [currentQuality, setCurrentQuality] = useAtom(currentQualityAtom);

  const [videoTracks, setVideoTracks] = useState<VideoTrack[]>([]);
  const [currentVideoTrack, setCurrentVideoTrack] = useState<
    VideoTrack | undefined
  >(undefined);

  const [paused, setPaused] = useAtom(pausedAtom);
  const setIsBuffering = useSetAtom(isBufferingAtom);
  const playBackRate = useAtomValue(playBackRateAtom);
  const volume = useAtomValue(volumeAtom);

  const showBufferingTimeout = useRef<NodeJS.Timeout | null>(null);
  const shouldMaintainTime = useRef(false);

  const hasResumeTime = useRef(false);
  const shouldStartResumeTime = useRef(false);

  const refCurrentTime = useRef(currentTime);

  useEffect(() => {
    playerRef.current?.presentFullscreenPlayer();
  }, []);

  useEffect(() => {
    setPlayer(playerRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setPlayer, playerRef.current]);

  const handleProgress = useCallback(
    (progress: OnProgressData) => {
      if (progress.currentTime > 0) {
        shouldStartResumeTime.current = true;
      }

      setCurrentTime(progress.currentTime);
      setPlayableDuration(progress.playableDuration);
    },
    [setCurrentTime, setPlayableDuration]
  );

  const handleLoad = useCallback(
    (data: OnLoadData) => {
      const duration = data.duration;

      setDuration(duration);
      setVideoSize(data.naturalSize);

      if (videos.length > 1) {
        return;
      }

      const sortedVideoTracks = data.videoTracks.sort((a, b) => {
        if (a.height === b.height) {
          return b.bitrate - a.bitrate;
        }

        return b.height - a.height;
      });

      const qualityList = sortedVideoTracks.map(
        (track) => `${track.height}p (${track.bitrate})`
      );

      setVideoTracks(sortedVideoTracks);
      setQualityList(qualityList);
      setCurrentVideoTrack(data.videoTracks[0]);
      setCurrentQuality(qualityList[0]);
    },
    [
      setDuration,
      setVideoSize,
      videos.length,
      setQualityList,
      setCurrentQuality,
    ]
  );

  const handleBuffer = useCallback(
    (data: OnBufferData) => {
      // should only show buffering after buffering for 200ms
      if (data.isBuffering) {
        showBufferingTimeout.current = setTimeout(() => {
          setIsBuffering(data.isBuffering);
        }, 200);
      } else {
        clearTimeout(showBufferingTimeout.current!);

        setIsBuffering(data.isBuffering);
      }
    },
    [setIsBuffering]
  );

  useEffect(() => {
    setSourceList(videos);

    if (videos.length > 1) {
      const qualityList = videos
        .map((video) => video.quality)
        .filter(Boolean)
        .sort((a, b) => {
          const aWithoutP = parseInt(a.replace('p', ''), 10);
          const bWithoutP = parseInt(b.replace('p', ''), 10);

          return bWithoutP - aWithoutP;
        });

      const quality = qualityList[0];

      setCurrentSource(videos.find((video) => video.quality === quality));

      setCurrentQuality(quality);

      setQualityList(qualityList);

      return;
    }

    const source = videos[0];

    setCurrentSource(source);

    // If the source is DASH or HLS, we will set quality list of video tracks (that in DASH or HLS Playlist)
    // If not, we will set quality list of video sources
    if (
      source.format !== VideoFormat.DASH &&
      source.format !== VideoFormat.HLS
    ) {
      const qualityList = videos
        .map((video) => video.quality)
        .filter(Boolean)
        .sort((a, b) => {
          const aWithoutP = parseInt(a.replace('p', ''), 10);
          const bWithoutP = parseInt(b.replace('p', ''), 10);

          return bWithoutP - aWithoutP;
        });

      const quality = qualityList[0];

      if (quality) {
        setCurrentQuality(quality);
      }

      setQualityList(qualityList);
    }
  }, [
    videos,
    setCurrentQuality,
    setCurrentSource,
    setQualityList,
    setSourceList,
  ]);

  useEffect(() => {
    (() => {
      if (!currentQuality) {
        return;
      }

      if (videos.length > 1) {
        shouldMaintainTime.current = true;

        setCurrentSource(
          videos.find((video) => video.quality === currentQuality)
        );

        return;
      }

      const currentTrack = videoTracks.find((track) => {
        const currentQualityWithoutP = parseInt(
          currentQuality.replace('p', ''),
          10
        );

        return track.height === currentQualityWithoutP;
      });

      setCurrentVideoTrack(currentTrack);

      if (currentTrack?.width && currentTrack?.height) {
        setVideoSize({
          width: currentTrack.width,
          height: currentTrack.height,
        });
      }
    })();
  }, [videos, currentQuality, setCurrentSource, setVideoSize, videoTracks]);

  useEffect(() => {
    setPaused(false);
  }, [currentSource?.file, setPaused]);

  useEffect(() => {
    if (!shouldMaintainTime.current) return;

    shouldMaintainTime.current = false;

    playerRef.current?.seek(currentTime);
  }, [currentTime]);

  useEffect(() => {
    refCurrentTime.current = currentTime;
  }, [currentTime]);

  useEffect(() => {
    if (!mediaId) return;

    if (hasResumeTime.current) return;
    if (!shouldStartResumeTime.current) return;

    hasResumeTime.current = true;

    const watchedEpisode = getWatchedEpisode(mediaId.anilistId);

    if (!watchedEpisode) return;

    playerRef.current?.seek(watchedEpisode.time);
  }, [currentTime, mediaId, setCurrentTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!currentEpisode?.id) return;
      if (!mediaId) return;

      markEpisodeAsWatched({
        episode: currentEpisode,
        time: refCurrentTime.current,
        mediaId: mediaId.anilistId,
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, [currentEpisode, mediaId]);

  const composedCurrentSource: VideoSource = useMemo(() => {
    let type: 'mpd' | 'm3u8' | undefined;

    if (currentSource?.format === VideoFormat.DASH) {
      type = 'mpd';
    } else if (currentSource?.format === VideoFormat.HLS) {
      type = 'm3u8';
    }

    return {
      uri: currentSource?.file.url,
      ...(currentSource?.file.headers && {
        headers: currentSource?.file.headers,
      }),
      ...(type && { type }),
    };
  }, [
    currentSource?.file.headers,
    currentSource?.file.url,
    currentSource?.format,
  ]);

  return (
    <StyledVideo
      currentTime={currentTime}
      onProgress={handleProgress}
      onLoad={handleLoad}
      onBuffer={handleBuffer}
      ref={playerRef}
      paused={paused}
      rate={playBackRate}
      volume={volume}
      source={currentSource ? composedCurrentSource : EMPTY_VIDEO}
      selectedVideoTrack={
        currentVideoTrack?.height
          ? { type: 'resolution', value: currentVideoTrack.height }
          : undefined
      }
      className="fixed inset-0 z-0 h-full w-full bg-black object-contain"
      onError={(error) => {
        Toast.show({
          type: 'error',
          text1: 'Media player error',
          text2: JSON.stringify(error).slice(0, 10),
        });
      }}
      {...props}
    />
  );
};

export default MediaPlayer;
