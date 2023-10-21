export function formatTime(seconds: string | number) {
  seconds = seconds.toString();
  let minutes = Math.floor(Number(seconds) / 60).toString();
  let hours = '';

  if (Number(minutes) > 59) {
    hours = Math.floor(Number(minutes) / 60).toString();
    hours = Number(hours) >= 10 ? hours : `0${hours}`;
    minutes = (Number(minutes) - Number(hours) * 60).toString();
    minutes = Number(minutes) >= 10 ? minutes : `0${minutes}`;
  }

  seconds = Math.floor(Number(seconds) % 60).toString();
  seconds = Number(seconds) >= 10 ? seconds : '0' + seconds;

  if (hours) {
    return `${hours}:${minutes}:${seconds}`;
  }

  return `${minutes}:${seconds}`;
}
