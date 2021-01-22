# docker-rendertron
Dockerized [Rendertron](https://github.com/GoogleChrome/rendertron) with ENV variables configuration

## Quick test
```bash
docker run -e="rendertron_cache=filesystem" -e="rendertron_width=1440" -e="rendertron_cacheDurationMinutes=60" -it -p 3000:3000 z1bba/env-rendertron
```

## Supported variables
See the [configuration instructions in the official Renderton docs](https://github.com/GoogleChrome/rendertron#config). 
Below you can find the mapping to the ENV variables

| JSON config variable name        | Env variable                    | Type                |
|----------------------------------|---------------------------------|---------------------|
| timeout                          | rendertron_timeout              | number              |
| width                            | rendertron_width                | number              |
| height                           | rendertron_height               | number              |
| reqHeaders                       | rendertron_reqHeaders           | Stringified JSON    |
| cache                            | rendertron_cache                | boolean             |
| cacheConfig.cacheDurationMinutes | rendertron_cacheDurationMinutes | number              |
| cacheConfig.cacheMaxEntries      | rendertron_cacheMaxEntries      | number              |
| cacheConfig.snapshotDir          | rendertron_snapshotDir          | string              |
| renderOnly                       | rendertron_renderOnly           | Stringified JSON    |
| closeBrowser                     | rendertron_closeBrowser         | boolean             |
| restrictedUrlPattern             | rendertron_restrictedUrlPattern | string              |

## More examples
```bash
# use the JSON value
docker run -e="rendertron_renderOnly=[\"http://google.com\"]" -it -p 3000:3000 z1bba/env-rendertron
```
