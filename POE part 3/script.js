/* script.js
   Simple JS for:
   - Mobile nav toggle
   - Date insertion
   - Basic form validation (contact + enquiry)
   - Lightbox for images
   - Search filter for products
   Written in an easy-to-understand.
*/

document.addEventListener('DOMContentLoaded', function() {
  // 1) Insert today's date into any element with id="date"
  var dateEl = document.getElementById('date');
  if (dateEl) {
    var today = new Date();
    dateEl.textContent = today.toDateString();
  }

  // 2) Mobile navigation toggle (very simple)
  var toggle = document.querySelector('.mobile-toggle');
  var nav = document.querySelector('nav.main-nav');
  if (toggle) {
    toggle.addEventListener('click', function() {
      if (nav) {
        // Toggle a visible class (CSS hides nav on small screens)
        nav.classList.toggle('visible');
        // set aria-expanded for accessibility
        var expanded = nav.classList.contains('visible');
        toggle.setAttribute('aria-expanded', expanded);
        // show/hide by inline style (simple)
        nav.style.display = expanded ? 'flex' : 'none';
      }
    });
  }

  // 3) Simple form validation helper
  function validateForm(form) {
    var valid = true;
    var required = form.querySelectorAll('[data-required="true"]');
    required.forEach(function(field) {
      var val = field.value ? field.value.trim() : '';
      var errId = field.id ? field.id + '-error' : 'err-' + Math.random();
      var errEl = document.getElementById(errId);
      if (!errEl) {
        errEl = document.createElement('div');
        errEl.id = errId;
        errEl.className = 'field-help';
        field.parentNode.appendChild(errEl);
      }
      if (!val) {
        valid = false;
        errEl.textContent = 'This field is required.';
      } else {
        errEl.textContent = '';
      }
    });

    // Simple email pattern check if there's an email field
    var email = form.querySelector('input[type="email"]');
    if (email) {
      var re = /^\S+@\S+\.\S+$/;
      var eErr = document.getElementById(email.id + '-error');
      if (!re.test(email.value.trim())) {
        valid = false;
        if (eErr) eErr.textContent = 'Please provide a valid email.';
      } else {
        if (eErr) eErr.textContent = '';
      }
    }
    return valid;
  }

  // 4) Contact form submit handling (simulation)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(contactForm)) {
        // Simple demo: show alert and reset
        var nameField = contactForm.querySelector('#contact-name');
        var name = nameField ? nameField.value.trim() : '';
        alert('Thank you, ' + (name || 'visitor') + '. Your message has been noted (demo).');
        contactForm.reset();
      }
    });
  }

  // 5) Enquiry form handling (simple estimate)
  var enquiryForm = document.getElementById('enquiry-form');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function(e) {
      e.preventDefault();
      if (validateForm(enquiryForm)) {
        var service = enquiryForm.querySelector('#enquiry-service');
        var qty = enquiryForm.querySelector('#enquiry-qty');
        var svc = service ? service.value : 'Service';
        var q = qty && qty.value ? parseInt(qty.value, 10) : 1;
        // Simple estimate formula for demo purposes
        var estimate = q * 250;
        var result = document.getElementById('enquiry-result');
        if (result) {
          result.innerHTML = '<p class="card">Estimated cost for <strong>' + q + ' x ' + svc + '</strong>: ZAR ' + estimate.toLocaleString() + '</p>';
        }
        enquiryForm.reset();
      }
    });
  }

  // 6) Lightbox for images (very simple)
  var lightboxImages = document.querySelectorAll('.lightbox-img');
  if (lightboxImages.length) {
    var lb = document.createElement('div');
    lb.id = 'lightbox';
    lb.style.position = 'fixed';
    lb.style.top = 0;
    lb.style.left = 0;
    lb.style.width = '100%';
    lb.style.height = '100%';
    lb.style.display = 'none';
    lb.style.alignItems = 'center';
    lb.style.justifyContent = 'center';
    lb.style.background = 'rgba(0,0,0,0.85)';
    lb.style.zIndex = 9999;
    document.body.appendChild(lb);

    lb.addEventListener('click', function() {
      lb.style.display = 'none';
      lb.innerHTML = '';
    });

    lightboxImages.forEach(function(img) {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function() {
        var clone = img.cloneNode();
        clone.style.maxWidth = '90%';
        clone.style.maxHeight = '90%';
        clone.style.boxShadow = '0 1rem 2rem rgba(0,0,0,0.5)';
        lb.innerHTML = '';
        lb.appendChild(clone);
        lb.style.display = 'flex';
      });
    });
  }

  // 7) Search filter for products
  var searchInput = document.getElementById('search-products');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      var q = this.value.toLowerCase();
      var items = document.querySelectorAll('.grid-cards .card');
      items.forEach(function(card) {
        var txt = card.textContent.toLowerCase();
        card.style.display = txt.indexOf(q) !== -1 ? '' : 'none';
      });
    });
  }
});
