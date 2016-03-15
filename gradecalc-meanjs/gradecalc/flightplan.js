var plan = require('flightplan');

var appName = 'gradecalc-server';
var username = 'deploy';
var myPassword = 'ChangeToThePasswordOnDeployment';
var startFile = 'bin/www';

var tmpDir = appName+'-' + new Date().getTime();

// configuration -- staging server
plan.target('staging', [
    {
        host: '104.236.241.211',
        username: username,
        password: myPassword
    }
]);

// configuration -- production server
plan.target('production', [
    {
        host: '104.236.241.211',
        username: username,
        password: myPassword
    }
]);

// run commands on localhost
plan.local(function(local) {
    local.log('Copy files to remote hosts');
    var filesToCopy = local.exec('git ls-files', {silent: true, maxBuffer: 10000*1024});
    local.transfer(filesToCopy, '/tmp/' + tmpDir);
});

// run commands on remote server
plan.remote(function(remote) {
    remote.log('Move folder to root');
    remote.sudo('cp -R /tmp/' + tmpDir + ' ~', {user: username});
    remote.rm('-rf /tmp/' + tmpDir);

    remote.log('Install dependencies');
    remote.sudo('npm --production --prefix ~/' + tmpDir + ' install ~/' + tmpDir, {user: username});

    remote.log('Reload application');
    remote.sudo('ln -snf ~/' + tmpDir + ' ~/'+appName, {user: username});
    remote.exec('forever stop ~/'+appName+'/./'+startFile, {failsafe: true});
    remote.exec('cp -f ~/gradecalc-server/public/stylesheets/base.jade ~/gradecalc-server/node_modules/express-stormpath/lib/views');
    remote.exec('forever start ~/'+appName+'/./'+startFile);
});