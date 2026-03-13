module.exports = {
    packagerConfig: {
        asar: true,
        ignore: [
            /^\/src/,
            /^\/public/,
            /^\/(README\.md|vite\.config\.js|forge\.config\.js|\.gitignore)/
        ]
    },
    rebuildConfig: {},
    makers: [
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                name: 'bingo'
            },
        },
        {
            name: '@electron-forge/maker-zip',
            platforms: ['darwin'],
        },
    ],
};
