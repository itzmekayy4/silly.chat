async function fetchMessagesOld(targetId) {
    try {
        const res = await fetch(`/channels/${targetId}`);
        const messages = await res.json();
        const userIds = [...new Set(messages.map(m => m.ownerid))];
        const userFetches = userIds.map(id =>
        fetch(`/users/${id}`).then(r => r.json()).then(u => [id, u])
        );
        const entries = await Promise.all(userFetches);
        const usersById = Object.fromEntries(entries);

        if (!res.ok) {
            throw new Error('Failed to fetch messages11');
        }
        clearMessages()
        messages.forEach(msg => {
            msg.user = usersById[msg.ownerid]
            displayMessage2(msg)
        });
    } catch (error) {
        console.log(error);
        //alert('Error fetching messages');
    }
}
async function fetchMessages(targetId) {
    try {
        const res = await fetch(`/channels/${targetId}`);
        const messages = await res.json();
        const userIds = [...new Set(messages.map(m => m.ownerid))];
        const userFetches = userIds.map(id =>
            fetch(`/users/${id}`).then(r => r.json()).then(u => [id, u])
        );
        const entries = await Promise.all(userFetches);
        const usersById = Object.fromEntries(entries);

        if (!res.ok) {
            throw new Error('Failed to fetch messages11');
        }
        messages.forEach(msg => {
            msg.user = usersById[msg.ownerid]
            displayMessage2(msg)
        });
    } catch (error) {
        console.log(error);
        //alert('Error fetching messages');
    }
}