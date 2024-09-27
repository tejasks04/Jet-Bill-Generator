let grandTotal = 0; 
let itemCount = 0;

const itemPrices = {
  "White pant": 4.58,
  "White shirt": 4.58,
  "White cap": 0.81,
  "White & Gray coat": 4.58,
  "Secondary dress": 9.38,
  "Secondary Cap": 0.87,
  "Big Bag": 5.10
};

document.addEventListener("DOMContentLoaded", loadBills);

document.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    generateBill();
  }
});

function loadBills() {
  const savedBills = JSON.parse(localStorage.getItem("bills")) || [];
  savedBills.forEach(item => {
    addRowToBillTable(item.dept, item.particulars, item.amount, item.quantity, item.total);
  });
  grandTotal = savedBills.reduce((sum, item) => sum + item.total, 0);
  document.getElementById("grand-total").textContent = grandTotal.toFixed(2);
}

function showClothes() {
  let selectedDept = document.getElementById("dept").value;
  let dept1Clothes = document.getElementById("cloths-dept1");

  dept1Clothes.style.display = "none";

  if (selectedDept === "Dept 1") {
    dept1Clothes.style.display = "block";
  }
}

function generateBill() {
  let dept = document.getElementById("dept").value;
  if (dept !== "Dept 1") return;

  const items = [
    { name: "White pant", qty: document.getElementById("wp-qty").value },
    { name: "White shirt", qty: document.getElementById("ws-qty").value },
    { name: "White cap", qty: document.getElementById("wc-qty").value },
    { name: "White & Gray coat", qty: document.getElementById("wgc-qty").value },
    { name: "Secondary dress", qty: document.getElementById("sd-qty").value },
    { name: "Secondary Cap", qty: document.getElementById("sc-qty").value },
    { name: "Big Bag", qty: document.getElementById("bb-qty").value }
  ];

  items.forEach(item => {
    let quantity = parseInt(item.qty);
    if (quantity > 0) {
      let amount = itemPrices[item.name];
      let total = amount * quantity;
      grandTotal += total;
      itemCount++; 

      const newBill = { dept, particulars: item.name, amount, quantity, total };
      saveBillToLocalStorage(newBill);

      addRowToBillTable(dept, item.name, amount, quantity, total);
    }
  });

  document.getElementById("grand-total").textContent = grandTotal.toFixed(2);

  document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
}

function addRowToBillTable(dept, particulars, amount, quantity, total) {
  let billBody = document.getElementById("bill-body");

  let row = document.createElement("tr");

  let serialCell = document.createElement("td");
  serialCell.textContent = itemCount; 
  row.appendChild(serialCell);

  let deptCell = document.createElement("td");
  deptCell.textContent = dept;
  row.appendChild(deptCell);

  let particularsCell = document.createElement("td");
  particularsCell.textContent = particulars;
  row.appendChild(particularsCell);

  let quantityCell = document.createElement("td");
  quantityCell.textContent = quantity;
  row.appendChild(quantityCell);

  let amountCell = document.createElement("td");
  amountCell.textContent = amount.toFixed(2); 
  row.appendChild(amountCell);

  let totalCell = document.createElement("td");
  totalCell.textContent = total.toFixed(2);
  row.appendChild(totalCell);

  billBody.appendChild(row);
}

function saveBillToLocalStorage(bill) {
  const savedBills = JSON.parse(localStorage.getItem("bills")) || [];
  savedBills.push(bill);
  localStorage.setItem("bills", JSON.stringify(savedBills));
}

function clearData() {
  document.querySelectorAll('input[type="number"]').forEach(input => input.value = '');
  document.getElementById("bill-body").innerHTML = "";
  grandTotal = 0;
  itemCount = 0;
  document.getElementById("grand-total").textContent = "0";
  localStorage.removeItem("bills");
}
