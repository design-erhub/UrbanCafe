// Urban Cafe front-end ordering demo.
// Replace the demo menu below with owner-approved items and prices before launch.
const CAFE_WHATSAPP = "918278843543";
const products = [
  {id:1,name:"Classic Margherita",category:"Pizza",price:249,description:"A comforting classic with tomato, mozzarella and herbs.",image:"https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=800&q=82"},
  {id:2,name:"Garden Fresh Pizza",category:"Pizza",price:299,description:"A colourful mix of vegetables and melted cheese.",image:"https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=82"},
  {id:3,name:"Urban Cheese Burger",category:"Burgers",price:179,description:"A juicy burger with cheese and crisp greens.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=82"},
  {id:4,name:"Crispy Veg Burger",category:"Burgers",price:149,description:"A crunchy patty layered with fresh ingredients.",image:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=82"},
  {id:5,name:"Golden Fries",category:"Sides",price:99,description:"Golden, crisp and made for sharing.",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=800&q=82"},
  {id:6,name:"Loaded Nachos",category:"Sides",price:159,description:"A crunchy snack with a delicious loaded finish.",image:"https://images.unsplash.com/photo-1513456852971-30c0b8199d4d?auto=format&fit=crop&w=800&q=82"},
  {id:7,name:"Cold Coffee",category:"Drinks",price:119,description:"A chilled, creamy coffee break.",image:"https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=82"},
  {id:8,name:"Classic Lemon Cooler",category:"Drinks",price:89,description:"A refreshing citrus drink.",image:"https://images.unsplash.com/photo-1513558161293-cdaf765edfd4?auto=format&fit=crop&w=800&q=82"}
];
const $ = (s) => document.querySelector(s);
const money = n => "₹" + n.toLocaleString("en-IN");
let cart = {};
let category = "All";
let searchTerm = "";
const grid = $("#productGrid");

function renderProducts(){
  const shown = products.filter(p => (category==="All" || p.category===category) && (p.name+" "+p.description).toLowerCase().includes(searchTerm));
  grid.innerHTML = shown.length ? shown.map(p=>`
    <article class="product-card">
      <div class="product-image"><img loading="lazy" src="${p.image}" alt="${p.name}"><span class="product-tag">${p.category}</span></div>
      <div class="product-info"><span class="product-category">${p.category}</span><h3>${p.name}</h3><p>${p.description}</p>
      <div class="product-bottom"><span class="product-price">${money(p.price)}</span><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div></div>
    </article>`).join("") : `<p class="empty-cart">No menu items match that search.</p>`;
}
function subtotal(){return products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0)}
function itemCount(){return Object.values(cart).reduce((a,b)=>a+b,0)}
function renderCart(){
  $("#bagCount").textContent=itemCount();
  const chosen=products.filter(p=>cart[p.id]);
  $("#cartLines").innerHTML=chosen.length?chosen.map(p=>`
    <div class="cart-item"><img src="${p.image}" alt=""><div><strong>${p.name}</strong><small>${money(p.price)} each</small>
    <div class="quantity"><button data-qty="${p.id}" data-delta="-1" aria-label="Decrease">−</button><span>${cart[p.id]}</span><button data-qty="${p.id}" data-delta="1" aria-label="Increase">+</button></div></div><span class="cart-item-price">${money(p.price*cart[p.id])}</span></div>`).join(""):`<div class="empty-cart"><strong>Your bag is waiting.</strong>Add something delicious to get started.</div>`;
  $("#cartBottom").hidden=!chosen.length;
  $("#subtotal").textContent=money(subtotal());
  $("#dialogTotal").textContent=money(subtotal());
}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");window.clearTimeout(toast.timer);toast.timer=window.setTimeout(()=>el.classList.remove("show"),2200)}
function openCart(){ $("#cartDrawer").classList.add("open");$("#scrim").classList.add("open");$("#cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden"}
function closeCart(){ $("#cartDrawer").classList.remove("open");$("#scrim").classList.remove("open");$("#cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow=""}
function openCheckout(){if(!itemCount())return;closeCart();$("#checkoutDialog").showModal()}
function updateFulfilment(){const delivery=$('input[name="fulfilment"]:checked').value==="Delivery";$("#addressLabel").hidden=!delivery;$("#addressLabel").querySelector("textarea").required=delivery}
$("#filters").addEventListener("click",e=>{const b=e.target.closest("[data-category]");if(!b)return;category=b.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===b));renderProducts()});
$("#menuSearch").addEventListener("input",e=>{searchTerm=e.target.value.trim().toLowerCase();renderProducts()});
grid.addEventListener("click",e=>{const b=e.target.closest("[data-add]");if(!b)return;const id=Number(b.dataset.add);cart[id]=(cart[id]||0)+1;renderCart();toast("Added to your bag")});
$("#cartLines").addEventListener("click",e=>{const b=e.target.closest("[data-qty]");if(!b)return;const id=Number(b.dataset.qty);cart[id]=(cart[id]||0)+Number(b.dataset.delta);if(cart[id]<=0)delete cart[id];renderCart()});
$("#openCart").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#scrim").addEventListener("click",closeCart);$("#checkoutButton").addEventListener("click",openCheckout);
$("#closeCheckout").addEventListener("click",()=>$("#checkoutDialog").close());
document.querySelectorAll('input[name="fulfilment"]').forEach(el=>el.addEventListener("change",updateFulfilment));
$("#checkoutForm").addEventListener("submit",e=>{
  e.preventDefault();
  if(!e.currentTarget.reportValidity())return;
  const data=new FormData(e.currentTarget);
  const lines=products.filter(p=>cart[p.id]).map(p=>`${p.name} x ${cart[p.id]} — ${money(p.price*cart[p.id])}`);
  const fulfilment=data.get("fulfilment");
  const message=[
    "Hello Urban Cafe! I'd like to enquire about this order:",
    ...lines,
    `Subtotal: ${money(subtotal())}`,
    `Name: ${data.get("name")}`,
    `Phone: ${data.get("phone")}`,
    `Order type: ${fulfilment}`,
    fulfilment==="Delivery"?`Address: ${data.get("address")}`:"",
    `Notes: ${data.get("notes")||"None"}`,
    "Please confirm item availability, final total and delivery details."
  ].filter(Boolean).join("\n");
  window.open(`https://wa.me/${CAFE_WHATSAPP}?text=${encodeURIComponent(message)}`,"_blank","noopener");
  $("#checkoutDialog").close();
  toast("Order enquiry prepared in WhatsApp");
});
$("#menuToggle").addEventListener("click",()=>{const nav=$("#nav");const open=nav.classList.toggle("open");$("#menuToggle").setAttribute("aria-expanded",String(open));$("#menuToggle").textContent=open?"×":"☰"});
$("#nav").addEventListener("click",e=>{if(e.target.closest("a")){$("#nav").classList.remove("open");$("#menuToggle").setAttribute("aria-expanded","false");$("#menuToggle").textContent="☰"}});
$("#year").textContent=new Date().getFullYear();
updateFulfilment();renderProducts();renderCart();
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
