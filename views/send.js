$('#senden').click(function () {
    $('#result').children().remove();
    let token = $('#tokenForm').serialize().split('=')[1];
    let client = new Discord.Client();
    client
        .login(token)
        .then(async () => {
            if (client.user.bot) {
                let app = await client.fetchApplication();
                let owner = `${app.owner.tag || app.owner.owner.user.tag} (${
                    app.owner.id || app.owner.user.id
                })`;
                let createdAt = moment(
                    client.user.createdAt,
                    'YYYYMMDD'
                ).fromNow();
                let avatarURL = client.user.displayAvatarURL;
                let inviteURL = await client.generateInvite();
                let result = `
                        <ul style="display: inline-block">
                            <li style="display: inline-block; padding-right: 2em;">
                                <a href="${avatarURL}" target="_blank"><img src="${avatarURL}" style="border-radius: 50%; width: 5em;"></a><br>
                                <br><div>${client.user.tag}</div>
                                <div><font color="#808080">${
                                    client.user.id
                                }</font><div>
                            </li>
                            <li style="float: right;">
                                <font color="#808080">
                                    <div>Created <font color="#FFFFFF">${createdAt}</font></div>
                                    <div>Used by <font color="#FFFFFF">${
                                        client.guilds.size
                                    }</font> servers for a total of <font color="#FFFFFF">${
                    client.users.size
                }</font> users</div>
                                    <div>Owned by <font color="#FFFFFF">${owner}</font></div>
                                    <div>This bot is <font color="#FFFFFF">${
                                        app.botPublic
                                            ? `public</font>, invite it with <a style="color: #7289DA;" href="${inviteURL}" target="_blank">this link</a>`
                                            : `private</font>`
                                    }</div>
                                    <div>Current bot status is <font color="#FFFFFF">${
                                        client.user.presence.status
                                    }</font><div>
                                    <div>Current bot game is <font color="#FFFFFF">${
                                        client.user.presence.game
                                            ? client.user.presence.game.name
                                            : 'nothing'
                                    }</font>
                                </font>
                            </li>
                        </ul>`;
                document.getElementById('loading').style.display = 'none';
                $('#result').append(result);
                client.destroy();
            } else {
                let createdAt = moment(
                    client.user.createdAt,
                    'YYYYMMDD'
                ).fromNow();
                let avatarURL = client.user.displayAvatarURL;
                let result = `
                        <ul style="display: inline-block">
                            <li style="display: inline-block; padding-right: 2em;">
                                <a href="${avatarURL}" target="_blank"><img src="${avatarURL}" style="border-radius: 50%; width: 5em;"></a><br>
                                <br><div>${client.user.tag}</div>
                                <div>${client.user.email}</div>
                                <div><font color="#808080">${
                                    client.user.id
                                }</font><div>
                            </li>
                            <li style="float: right;">
                            <br>
                                <font color="#808080">
                                    <div>Created <font color="#FFFFFF">${createdAt}</font></div>
                                    <div>On <font color="#FFFFFF">${
                                        client.guilds.size
                                    }</font> servers</div>
                                    <div>Nitro Subscription: <font color="#FFFFFF">${
                                        client.user.premium ? 'yes' : 'no'
                                    }</font></div>
                                    <div>2FA Security <font color="#FFFFFF">${
                                        client.user.mfaEnabled
                                            ? 'enabled'
                                            : 'disabled'
                                    }</font></div>
                                    <div>Friends with <font color="#FFFFFF">${
                                        client.user.friends.size
                                    }</font> users</div>
                                    <div>Notes available for <font color="#FFFFFF">${
                                        client.user.notes.size
                                    }</font> users</div>
                                </font>
                            </li>
                        </ul>`;
                document.getElementById('loading').style.display = 'none';
                $('#result').append(result);
                client.destroy();
            }
        })
        .catch((err) => {
            if (
                err.message !== 'Incorrect login details were provided.' &&
                err.message !== 'An invalid token was provided.'
            )
                return alert(err.message);
            document.getElementById('loading').style.display = 'none';
            $('#result').append(
                '<p style="background-color: #f76454; color: white; font-family: Nunito; font-size: 1em; border-radius: 10px; padding: 0.5em;"> Um... Looks like this token isn\'t valid! :\'( </p>'
            );
            setTimeout(function () {
                $('#result').children('p').remove();
            }, 3000);
            client.destroy();
        });
});
