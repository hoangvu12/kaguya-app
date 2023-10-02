Modules are saved to `FileSystem.documentDirectory/modules`

## Modules structure of the app (not the module itself):

```
modules/
│   └── module_id/ (anime)
│       ├── search.js
│       ├── episodes.js
│       ├── video-servers.js
│       ├── video-container.js
│       └── metadata.json
    └── module_id/ (manga)
        ├── search.js
        ├── chapters.js
        ├── images.js
        └── metadata.json
```

## Metadata structure:

```
{
  "id": String (eg: aniwave),
  "name": String (e.g. "AniWave"),
  "version": String (e.g. "0.0.1"),
  "languages": String[] (e.g. ["English"]),
  "type": "anime",
  "info": {
    "logo": String (e.g. "https://logo-example.com"),
    "author": String (e.g. "MostHandsomeDude"),
    "description": String (e.g. "A module to get the data from aniwatch.to")
  }
}
```

## Structure of code

There are some built-in functions that you want to avoid when writing your own code:

`run`: This function is the main function which will be called by the app

- Type:
  ```ts
  run(args: Record<string, any>): Promise<void>
  ```

`sendRequest`: Call this function with [AxiosRequestConfig](https://axios-http.com/docs/req_config) to send HTTP requests.

- Type:
  ```ts
  sendRequest(config: AxiosRequestConfig): Promise<unknown>
  ```
- Note: Because data are stringified when passing between WebView and App, methods won't probably work

- Example:
  ```ts
  const data = await sendRequest({
    url: 'https://api64.ipify.org/?format=json',
  }); // { "ip": "xxx.xxx.xxx.xxx" }
  ```

`sendResponse`: Call this function to send back the result to the app.

- Type:

  ```ts
  sendResponse(args: Record<string, any>): Promise<void>
  ```

- Example:

  ```ts
  sendResponse({ ip: 'xxx.xxx.xxx.xx' });
  ```
