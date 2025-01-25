const componentFilesRegex = /^(\/\w)?src\/components\/.*$/;
const styleFilesRegex = /^(\/\w)?src\/styles\/.*$/;
const scriptFilesRegex = /^(\/\w)?src\/scripts\/.*$/;
const outputRegex = /^(\/\w)?lib\/.*$/;
const componentEntryRegex = /^(\/)?src\/components\/index\.ts$/;
const styleEntryRegex = /^(\/)?src\/styles\/index\.scss$/;
const scriptEntryRegex = /^(\/)?src\/scripts\/index\.ts$/;
const componentDirsRegex = /^(\/)?src\/components\/[^/]+\/$/;
const styleDirsRegex = /^(\/)?src\/styles\/[^/]+\/$/;
const scriptDirsRegex = /^(\/)?src\/scripts\/[^/]+\/$/;
const componentEntriesRegex = /^(\/)?src\/components\/[^/]+\/index\.ts$/;

export const standard = {
    componentFiles: 'src/components',
    styleFiles: 'src/styles',
    scriptFiles: 'src/scripts',
    output: 'lib',
    componentEntry: 'src/components/index.ts',
    styleEntry: 'src/styles/index.scss',
    scriptEntry: 'src/scripts/index.ts',
    componentDirs: 'src/components/*/',
    styleDirs: 'src/styles/*/',
    scriptDirs: 'src/scripts/*/',
    componentEntries: 'src/components/*/index.ts',
}
