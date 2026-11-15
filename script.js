
// Create a Node
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// Create a Linked List
class LinkedList {
    constructor() {
        this.head = null;
    }

    // Insert at Beginning
    insertBeginning(data) {
        let newNode = new Node(data);
        newNode.next = this.head;
        this.head = newNode;
    }

    // Insert at End
    insertEnd(data) {
        let newNode = new Node(data);

        if (this.head === null) {
            this.head = newNode;
            return;
        }

        let temp = this.head;

        while (temp.next !== null) {
            temp = temp.next;
        }

        temp.next = newNode;
    }

    // Insert at Specific Position (1-based)
    insertPosition(data, position) {
        if (position < 1) return false;

        if (position === 1) {
            this.insertBeginning(data);
            return true;
        }

        let temp = this.head;

        for (let i = 1; i < position - 1; i++) {
            if (temp === null) return false;
            temp = temp.next;
        }

        if (temp === null) return false;

        let newNode = new Node(data);
        newNode.next = temp.next;
        temp.next = newNode;

        return true;
    }

    // Delete at Beginning
    deleteBeginning() {
        if (this.head === null) return false;

        this.head = this.head.next;
        return true;
    }

    // Delete at End
    deleteEnd() {
        if (this.head === null) return false;

        if (this.head.next === null) {
            this.head = null;
            return true;
        }

        let temp = this.head;

        while (temp.next.next !== null) {
            temp = temp.next;
        }

        temp.next = null;
        return true;
    }

    // Delete at Specific Position (1-based)
    deletePosition(position) {
        if (position < 1 || this.head === null) {
            return false;
        }

        if (position === 1) {
            return this.deleteBeginning();
        }

        let temp = this.head;

        for (let i = 1; i < position - 1; i++) {
            if (temp === null) return false;
            temp = temp.next;
        }

        if (temp === null || temp.next === null) {
            return false;
        }

        temp.next = temp.next.next;
        return true;
    }

    // Search for a Node
    search(data) {
        let temp = this.head;
        let position = 1;

        while (temp !== null) {
            if (temp.data === data) {
                return position;
            }

            temp = temp.next;
            position++;
        }

        return -1;
    }

    // Display the Linked List
    display() {
        let values = [];
        let temp = this.head;

        while (temp !== null) {
            values.push(temp.data);
            temp = temp.next;
        }

        return values;
    }
}

// Create Linked List Object
const list = new LinkedList();

// Get input values
function getValue() {
    const value = document.getElementById("value").value;

    if (value.trim() === "") {
        showMessage("Please enter a value.");
        return null;
    }

    const number = Number(value);

    if (!Number.isFinite(number)) {
        showMessage("Please enter a valid number.");
        return null;
    }

    return number;
}

function getPosition() {
    const value = document.getElementById("position").value;

    if (value.trim() === "") {
        showMessage("Please enter a position.");
        return null;
    }

    const position = Number(value);

    if (!Number.isInteger(position) || position < 1) {
        showMessage("Enter a valid positive position.");
        return null;
    }

    return position;
}

// Show Message
function showMessage(message) {
    document.getElementById("message").textContent = message;
}

// Display Nodes Visually
function displayList() {
    const container = document.getElementById("list");
    container.replaceChildren();

    const values = list.display();

    if (values.length === 0) {
        showMessage("The linked list is empty.");
        return;
    }

    values.forEach((value, index) => {
        const node = document.createElement("div");
        node.className = "node";
        node.textContent = value;

        container.appendChild(node);

        const arrow = document.createElement("span");
        arrow.textContent = index === values.length - 1
            ? " → NULL"
            : " → ";

        container.appendChild(arrow);
    });
}

// Insert at Beginning
function insertBeginning() {
    const value = getValue();
    if (value === null) return;

    list.insertBeginning(value);
    displayList();
    showMessage(value + " inserted at beginning.");
}

// Insert at End
function insertEnd() {
    const value = getValue();
    if (value === null) return;

    list.insertEnd(value);
    displayList();
    showMessage(value + " inserted at end.");
}

// Insert at Position
function insertPosition() {
    const value = getValue();
    if (value === null) return;

    const position = getPosition();
    if (position === null) return;

    if (!list.insertPosition(value, position)) {
        showMessage("Invalid insertion position.");
        return;
    }

    displayList();
    showMessage(value + " inserted at position " + position + ".");
}

// Delete at Beginning
function deleteBeginning() {
    if (!list.deleteBeginning()) {
        showMessage("The linked list is empty.");
        return;
    }

    displayList();
    showMessage("First node deleted.");
}

// Delete at End
function deleteEnd() {
    if (!list.deleteEnd()) {
        showMessage("The linked list is empty.");
        return;
    }

    displayList();
    showMessage("Last node deleted.");
}

// Delete at Position
function deletePosition() {
    const position = getPosition();
    if (position === null) return;

    if (!list.deletePosition(position)) {
        showMessage("Invalid deletion position.");
        return;
    }

    displayList();
    showMessage("Node at position " + position + " deleted.");
}

// Search Node
function searchNode() {
    const value = getValue();
    if (value === null) return;

    const position = list.search(value);

    if (position === -1) {
        showMessage(value + " was not found.");
    } else {
        showMessage(value + " found at position " + position + ".");
    }
}
