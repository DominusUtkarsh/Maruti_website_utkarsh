document.addEventListener('DOMContentLoaded', function() {
  // Initialize elements
  const modelSelect = document.getElementById('model');
  const calculateBtn = document.querySelector('.calculate-btn');
  const priceDisplay = document.getElementById('totalPrice');
  
  // Add click event to calculate button
  calculateBtn.addEventListener('click', calculatePrice);
  
  // Add animation to form elements when they gain focus
  document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'scale(1.02)';
      this.parentElement.style.boxShadow = '0 0 0 3px rgba(230, 0, 0, 0.1)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'scale(1)';
      this.parentElement.style.boxShadow = 'none';
    });
  });
  
  // Checkbox animation
  document.querySelectorAll('.option-item input').forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      const optionItem = this.closest('.option-item');
      if(this.checked) {
        optionItem.style.background = 'rgba(230, 0, 0, 0.1)';
        optionItem.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
      } else {
        optionItem.style.background = 'transparent';
        optionItem.style.boxShadow = 'none';
      }
    });
  });
});

function calculatePrice() {
  // Button click animation
  const btn = document.querySelector('.calculate-btn');
  btn.style.transform = 'scale(0.95)';
  setTimeout(() => {
    btn.style.transform = 'scale(1)';
  }, 200);
  
  // Get values
  const modelPrice = parseInt(document.getElementById("model").value);
  const insurance = document.getElementById("insurance").checked ? 
                   parseInt(document.getElementById("insurance").value) : 0;
  const warranty = document.getElementById("warranty").checked ? 
                  parseInt(document.getElementById("warranty").value) : 0;

  // Validate selection
  if (modelPrice === 0) {
    showErrorAnimation();
    return;
  }

  // Calculate total
  const subtotal = modelPrice + insurance + warranty;
  const taxes = subtotal * 0.18; // 18% tax
  const total = subtotal + taxes;
  
  // Display price with animation
  showPrice(total);
}

function showErrorAnimation() {
  const modelSelect = document.getElementById("model");
  modelSelect.style.border = "2px solid red";
  modelSelect.style.animation = "shake 0.5s";
  
  setTimeout(() => {
    modelSelect.style.border = "1px solid #e0e0e0";
    modelSelect.style.animation = "none";
  }, 1000);
  
  // Add shake animation to CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20%, 60% { transform: translateX(-5px); }
      40%, 80% { transform: translateX(5px); }
    }
  `;
  document.head.appendChild(style);
}

function showPrice(total) {
  const priceDisplay = document.getElementById("totalPrice");
  const priceAmount = priceDisplay.querySelector('.price-amount');
  
  // Format currency
  const formattedTotal = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(total);
  
  // Reset animation
  priceDisplay.classList.remove('show');
  void priceDisplay.offsetWidth; // Trigger reflow
  
  // Animate price change
  let current = 0;
  const increment = total / 20;
  const timer = setInterval(() => {
    current += increment;
    if(current >= total) {
      clearInterval(timer);
      current = total;
    }
    priceAmount.textContent = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(current);
  }, 50);
  
  // Show display
  priceDisplay.classList.add('show');
}