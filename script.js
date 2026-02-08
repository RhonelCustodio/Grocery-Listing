// Replace this with YOUR Firebase config object
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const listRef = db.collection('groceries');

// 1. Add Item to Firestore
function addItem() {
    const item = document.getElementById('itemInput').value;
    if (item) {
        listRef.add({
            name: item,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });
        document.getElementById('itemInput').value = '';
    }
}

// 2. Real-time Listener (Admin View)
listRef.orderBy('timestamp', 'desc').onSnapshot(snapshot => {
    const listElement = document.getElementById('groceryList');
    listElement.innerHTML = '';
    snapshot.forEach(doc => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${doc.data().name}</span> 
                        <button onclick="deleteItem('${doc.id}')" style="background:none; color:red;">✕</button>`;
        listElement.appendChild(li);
    });
});

// 3. Delete individual item
function deleteItem(id) {
    listRef.doc(id).delete();
}

// 4. Clear everything
function clearList() {
    if(confirm("Clear the whole list?")) {
        listRef.get().then(snapshot => {
            snapshot.forEach(doc => doc.ref.delete());
        });
    }
          } 
