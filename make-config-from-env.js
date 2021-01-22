const fs = require("fs");

const Bool = value => value === 'true';
const StringifiedJSON = value => JSON.parse(value);
const Identity = value => value;
const TransformIdentity = (config, name, value) => config[name] = value;
const TransformCacheConfig = (config, name, value) => {
    config.cacheConfig = config.cacheConfig || {};
    config.cacheConfig[name] = value;
}

const envPrefix = 'rendertron_'
const configVars = {
    timeout: {
        type: Number,
    },
    width: {
        type: Number,
    },
    height: {
        type: Number,
    },
    cache: {
        type: String,
    },
    closeBrowser: {
        type: Bool,
    },
    restrictedUrlPattern: {
        type: String,
    },
    cacheDurationMinutes: {
        type: Number,
        transform: TransformCacheConfig,
    },
    cacheMaxEntries: {
        type: Number,
        transform: TransformCacheConfig,
    },
    snapshotDir: {
        type: String,
        transform: TransformCacheConfig,
    },
    reqHeaders: {
        type: StringifiedJSON,
    },
    renderOnly: {
        type: StringifiedJSON,
    }
};

const rendertronConfig = {};
Object.keys(configVars).forEach(envVarName => {
    const castToType = configVars[envVarName].type || Identity;
    const addConfigValue = configVars[envVarName].transform || TransformIdentity;
    const envKey = envPrefix + envVarName;
    const envValue = process.env[envKey];

    if (envValue !== undefined) {
        const castedValue = castToType(envValue);
        addConfigValue(rendertronConfig, envVarName, castedValue);
    }
})

const configString = JSON.stringify(rendertronConfig, null, 2);
fs.writeFileSync('config.json', configString);