/**
 * Assignment: Web Technologies - Assignment 02
 * Features: Ingredient/Category Filter, Favorites Management, DOM Manipulation
 */

// 1. Recipe Data Array
const myRecipes = [
    { 
        name: "Omelette", 
        category: "Breakfast", 
        ingredient: "egg", 
        instruction: "Beat 2-3 eggs with salt. Pour into a hot pan with butter. Fold when set and serve warm." 
    },
    { 
        name: "Chicken Sandwich", 
        category: "Lunch", 
        ingredient: "chicken", 
        instruction: "Toast your bread. Layer grilled chicken, lettuce, and mayo. Slice diagonally and enjoy." 
    },
    { 
        name: "Chocolate Cake", 
        category: "Dessert", 
        ingredient: "cocoa", 
        instruction: "Mix cocoa powder, flour, sugar, and milk. Bake at 180°C for 25-30 minutes." 
    }
];

let myFav = []; // Store names of favorite recipes

// Select core elements
const searchBtn = document.getElementById('searchBtn');
const resultDiv = document.getElementById("results");
const favDiv = document.getElementById("favoritesList");

// 2. Main Search Function
function checkRecipe() {
    const text = document.getElementById("searchInput").value.toLowerCase().trim();
    const category = document.getElementById("categoryFilter").value;
    
    resultDiv.innerHTML = ""; // Clear results

    // Validation: Check for empty search input
    if (text === "" && category === "All") {
        alert("Please enter an ingredient or choose a category!");
        return;
    }

    // Filter Logic: Check for both ingredient and category
    const filtered = myRecipes.filter(r => {
        const matchesText = r.ingredient.includes(text) || r.name.toLowerCase().includes(text);
        const matchesCategory = (category === "All" || r.category === category);
        return matchesText && matchesCategory;
    });

    // Friendly message if no results found
    if (filtered.length === 0) {
        resultDiv.innerHTML = `<p>No recipes found matching your criteria. 😢</p>`;
        return;
    }

    // 3. Dynamic DOM Creation
    filtered.forEach(recipe => {
        const box = document.createElement("div"); // DOM Creation
        box.className = "recipe-card";
        box.innerHTML = `
            <h3>🍴 ${recipe.name}</h3>
            <p><strong>Category:</strong> ${recipe.category}</p>
            <button onclick="toggleInstruction(this)">View Method</button>
            <div class="instruction-text" style="display:none">${recipe.instruction}</div>
            <button class="btn-fav" onclick="addFav('${recipe.name}')">Save to Favorites ❤️</button>
        `;
        resultDiv.appendChild(box); // DOM Manipulation
    });
}

// 4. Collapsible Instructions (DOM Traversal)
function toggleInstruction(btn) {
    // DOM Traversal: Accessing the instruction div which is the next sibling
    const textDiv = btn.nextElementSibling;
    const isHidden = textDiv.style.display === "none";
    
    textDiv.style.display = isHidden ? "block" : "none";
    btn.innerText = isHidden ? "Hide Method" : "View Method";
}

// 5. Favorites List Management
function addFav(name) {
    // Error Handling: Duplicate Validation
    if (myFav.includes(name)) {
        alert("Already in your favorites!");
        return;
    }

    myFav.push(name);
    
    // Clear "Empty" message if it's the first favorite
    if (myFav.length === 1) favDiv.innerHTML = "";

    const item = document.createElement("div");
    item.className = "recipe-card";
    item.innerHTML = `
        <p><strong>❤️ ${name}</strong></p>
        <button class="btn-remove" onclick="removeFav(this, '${name}')">Remove</button>
    `;
    favDiv.appendChild(item);
}

// 6. Remove Functionality
function removeFav(btn, name) {
    // Remove from array logic
    myFav = myFav.filter(fav => fav !== name);
    
    // DOM Traversal: Move up to parent node to remove the element
    btn.parentNode.remove();

    // Show empty message if nothing left
    if (myFav.length === 0) {
        favDiv.innerHTML = '<p class="empty-msg">Your favorites list is currently empty.</p>';
    }
}

// Attach Search Event
searchBtn.addEventListener('click', checkRecipe);