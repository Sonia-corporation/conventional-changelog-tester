const {config} = require('dotenv');
const semanticRelease = require('semantic-release');

async function release() {
    try {
        config();

        const result = await semanticRelease({
            branches: [
                'main',
            ],
            noCi: true,
            dryRun: true
        }, {
            // Pass the variable `MY_ENV_VAR` to semantic-release without having to modify the local `process.env`
            env: {...process.env},
        });

        if (result) {
            const {lastRelease, commits, nextRelease, releases} = result;

            console.log(`Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`);

            if (lastRelease.version) {
                console.log(`The last release was "${lastRelease.version}".`);
            }

            for (const release of releases) {
                console.log(`The release was published with plugin "${release.pluginName}".`);
            }
        } else {
            console.log('No release published.');
        }
    } catch (err) {
        console.error('The automated release failed with %O', err)
    }
}

void release();
