/**
* Template Name: Gp
* Updated: Aug 30 2023 with Bootstrap v5.3.1
* Template URL: https://bootstrapmade.com/gp-free-multipurpose-html-bootstrap-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function (e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function (e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function (e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  /**
   * Clients Slider
   */
  new Swiper('.clients-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 2,
        spaceBetween: 40
      },
      480: {
        slidesPerView: 3,
        spaceBetween: 60
      },
      640: {
        slidesPerView: 4,
        spaceBetween: 80
      },
      992: {
        slidesPerView: 6,
        spaceBetween: 120
      }
    }
  });

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function (e) {
        e.preventDefault();
        portfolioFilters.forEach(function (el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function () {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

  /* Phân trang */
  document.addEventListener("DOMContentLoaded", function () {
    const pageLinks = document.querySelectorAll(".page-link");
    const tabPanes = document.querySelectorAll(".tab-pane");

    pageLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault();

        // Loại bỏ lớp "active" từ tất cả các tab pane
        tabPanes.forEach(function (pane) {
          pane.classList.remove("active");
        });

        // Lấy id của tab pane được chọn
        const targetId = this.getAttribute("href").substring(1);

        // Hiển thị tab pane tương ứng
        document.getElementById(targetId).classList.add("active");
      });
    });
  });

  /* Inventory */
  document.addEventListener("DOMContentLoaded", function () {
    // Gán sự kiện click cho các phần tử HTML
    var itemCards = document.querySelectorAll(".item-card, .item-card-2");
    for (var i = 0; i < itemCards.length; i++) {
      itemCards[i].addEventListener("click", function () {
        showItemDetail(this);
      });
    }

    function showItemDetail(element) {
      // Ẩn thông báo "Chưa chọn vật phẩm"
      document.getElementById("noItemSelected").style.display = "none";

      // Hiển thị chi tiết vật phẩm
      document.getElementById("item-detail-card").style.display = "block";

      // Cập nhật thông tin chi tiết vật phẩm từ dữ liệu mẫu
      document.getElementById("gymName").textContent = element.getAttribute("data-gym-name");
      document.getElementById("itemType").textContent = "Loại thẻ: " + element.getAttribute("data-item-type");
      document.getElementById("itemDescription").textContent = "Mô tả: " + element.getAttribute("data-item-description");
      document.getElementById("itemPrice").textContent = "Giá thẻ: " + element.getAttribute("data-item-price");
      document.getElementById("itemStatus").textContent = "Trạng thái: " + element.getAttribute("data-item-status");

      var activationDate = new Date(element.getAttribute("data-activation-date"));
      var activationPeriod = parseInt(element.getAttribute("data-activation-period"), 10);

      // Tính ngày hết hạn bằng cộng thời hạn kích hoạt vào ngày mua
      var expirationDate = new Date(activationDate);
      expirationDate.setDate(expirationDate.getDate() + activationPeriod);

      // Hiển thị ngày mua, thời hạn kích hoạt và ngày hết hạn
      document.querySelector(".purchase-date span").textContent = activationDate.toLocaleDateString();
      document.querySelector(".activation-period span").textContent = activationPeriod + " ngày";
      document.querySelector(".expiration-date span").textContent = expirationDate.toLocaleDateString();
    }
  });

  $(document).ready(function () {
    // Bắt sự kiện khi một tab được nhấn
    $('#myTabs a').on('click', function (e) {
      e.preventDefault();
      $(this).tab('show');
    });
  });

  // Calender
  document.addEventListener('DOMContentLoaded', function () {
    var initialLocaleCode = 'vi';
    var calendarEl = document.getElementById('calendar');
    const myModal = new bootstrap.Modal(document.getElementById('form'));
    const dangerAlert = document.getElementById('danger-alert');
    const close = document.querySelector('.btn-close');
    const myEvents = JSON.parse(localStorage.getItem('events')) || [
      {
        id: uuidv4(),
        title: `Tập chân`,
        start: '2023-03-11',
        backgroundColor: 'red',
        allDay: true,
        editable: true,
      },
    ];


    var calendar = new FullCalendar.Calendar(calendarEl, {
      customButtons: {
        customButton: {
          text: 'Đặt kế hoạch tập',
          click: function () {
            myModal.show();
            const modalTitle = document.getElementById('modal-title');
            const submitButton = document.getElementById('submit-button');
            modalTitle.innerHTML = 'Kế hoạch tập'
            submitButton.innerHTML = 'Lưu kế hoạch'
            submitButton.classList.remove('btn-primary');
            submitButton.classList.add('btn-success');
            close.addEventListener('click', () => {
              myModal.hide()
            })
          }
        }
      },
      headerToolbar: {
        right: 'customButton today prev,next',
        center: 'title',
        left: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      },
      locale: initialLocaleCode,
      buttonIcons: true, // show the prev/next text
      weekNumbers: true,
      navLinks: true, // can click day/week names to navigate views
      editable: true,

      dayMaxEvents: true, // allow "more" link when too many events
      events: myEvents,
      eventDidMount: function (info) {
        info.el.addEventListener('contextmenu', function (e) {
          e.preventDefault();
          let existingMenu = document.querySelector('.context-menu');
          existingMenu && existingMenu.remove();
          let menu = document.createElement('div');
          menu.className = 'context-menu';
          menu.innerHTML = `<ul>
            <li><i class="fas fa-edit"></i>Chỉnh sửa</li>
            <li><i class="fas fa-trash-alt"></i>Xóa</li>
          </ul>`;

          const eventIndex = myEvents.findIndex(event => event.id === info.event.id);

          document.body.appendChild(menu);
          menu.style.top = e.pageY + 'px';
          menu.style.left = e.pageX + 'px';

          // Edit context menu

          menu.querySelector('li:first-child').addEventListener('click', function () {
            menu.remove();

            const editModal = new bootstrap.Modal(document.getElementById('form'));
            const modalTitle = document.getElementById('modal-title');
            const titleInput = document.getElementById('event-title');
            const startDateInput = document.getElementById('start-date');
            const endDateInput = document.getElementById('end-date');
            const colorInput = document.getElementById('event-color');
            const submitButton = document.getElementById('submit-button');
            const cancelButton = document.getElementById('cancel-button');
            modalTitle.innerHTML = 'Edit Event';
            titleInput.value = info.event.title;
            startDateInput.value = moment(info.event.start).format('YYYY-MM-DD');
            endDateInput.value = moment(info.event.end, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD');
            colorInput.value = info.event.backgroundColor;
            submitButton.innerHTML = 'Save Changes';

            editModal.show();
            submitButton.classList.remove('btn-success');
            submitButton.classList.add('btn-primary');

            // Edit button

            submitButton.addEventListener('click', function () {
              const updatedEvents = {
                id: info.event.id,
                title: titleInput.value,
                start: startDateInput.value,
                end: moment(endDateInput.value, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD'),
                backgroundColor: colorInput.value,
              };

              if (updatedEvents.end <= updatedEvents.start) {
                // Add an if statement to check end date
                dangerAlert.style.display = 'block';
                return;
              }

              const eventIndex = myEvents.findIndex(event => event.id === updatedEvents.id);
              myEvents.splice(eventIndex, 1, updatedEvents);
              localStorage.setItem('events', JSON.stringify(myEvents));

              // Update the event in the calendar
              const calendarEvent = calendar.getEventById(info.event.id);
              calendarEvent.setProp('title', updatedEvents.title);
              calendarEvent.setStart(updatedEvents.start);
              calendarEvent.setEnd(updatedEvents.end);
              calendarEvent.setProp('backgroundColor', updatedEvents.backgroundColor);

              editModal.hide();
            });
          });

          // Delete menu
          menu.querySelector('li:last-child').addEventListener('click', function () {
            const deleteModal = new bootstrap.Modal(document.getElementById('delete-modal'));
            const modalBody = document.getElementById('delete-modal-body');
            const cancelModal = document.getElementById('cancel-button');
            modalBody.innerHTML = `Bạn có chắc chắn xóa hoạt động <b>"${info.event.title}"</b>`;
            deleteModal.show();

            const deleteButton = document.getElementById('delete-button');
            deleteButton.addEventListener('click', function () {
              myEvents.splice(eventIndex, 1);
              localStorage.setItem('events', JSON.stringify(myEvents));
              calendar.getEventById(info.event.id).remove();
              deleteModal.hide();
              menu.remove();
            });

            cancelModal.addEventListener('click', function () {
              deleteModal.hide();
            });
          });

          document.addEventListener('click', function () {
            menu.remove();
          });
        });
      },

    });

    calendar.on('select', function (info) {

      const startDateInput = document.getElementById('start-date');
      const endDateInput = document.getElementById('end-date');
      startDateInput.value = info.startStr;
      const endDate = moment(info.endStr, 'YYYY-MM-DD').subtract(1, 'day').format('YYYY-MM-DD');
      endDateInput.value = endDate;
      if (startDateInput.value === endDate) {
        endDateInput.value = '';
      }
    });

    calendar.render();

    const form = document.querySelector('form');

    form.addEventListener('submit', function (event) {
      event.preventDefault(); // prevent default form submission

      // retrieve the form input values
      const title = document.querySelector('#event-title').value;
      const startDate = document.querySelector('#start-date').value;
      const endDate = document.querySelector('#end-date').value;
      const color = document.querySelector('#event-color').value;
      const endDateFormatted = moment(endDate, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
      const eventId = uuidv4();

      console.log(eventId);

      if (endDateFormatted <= startDate) { // add if statement to check end date
        dangerAlert.style.display = 'block';
        return;
      }

      const newEvent = {
        id: eventId,
        title: title,
        start: startDate,
        end: endDateFormatted,
        allDay: false,
        backgroundColor: color
      };

      // add the new event to the myEvents array
      myEvents.push(newEvent);

      // render the new event on the calendar
      calendar.addEvent(newEvent);

      // save events to local storage
      localStorage.setItem('events', JSON.stringify(myEvents));

      myModal.hide();
      form.reset();
    });

    myModal._element.addEventListener('hide.bs.modal', function () {
      dangerAlert.style.display = 'none';
      form.reset();
    });

    // Trong sự kiện click trên ngày trong lịch
    calendar.on('dateClick', function (info) {
      // Lấy thông tin buổi tập tương ứng với ngày này
      const workoutData = getWorkoutDataForDate(info.dateStr);

      if (workoutData) {
        document.getElementById('gym-location').value = workoutData.gymLocation;
        document.getElementById('gym-address').value = workoutData.gymAddress;
        document.getElementById('workout-date').value = workoutData.date;
        document.getElementById('check-in-time').value = workoutData.checkInTime;
        document.getElementById('membership-package').value = workoutData.membershipPackage;

        const detailModal = new bootstrap.Modal(document.getElementById('detail-modal'));
        detailModal.show();
      }
    });

    // Hàm để lấy thông tin buổi tập dựa trên ngày (thay thế bằng dữ liệu thực tế của bạn)
    function getWorkoutDataForDate(date) {
      // Thực hiện việc truy vấn dữ liệu hoặc xác định thông tin buổi tập dựa trên ngày
      // Trả về đối tượng chứa thông tin buổi tập
      // Ví dụ:
      return {
        gymLocation: "SKY CITY TOWER - QUẬN ĐỐNG ĐA",
        gymAddress: "Sky City, Tầng M, 88 Láng Hạ, P.Láng Hạ, Q.Đống Đa, Hà Nội",
        date: date,
        checkInTime: "12:36 AM",
        membershipPackage: "Gói linh hoạt"
      };
    }

    // Xử lý khi người dùng nhấp vào liên kết "Đánh giá ngay"
    const reviewLink = document.getElementById('review-link');
    reviewLink.addEventListener('click', function (event) {
      event.preventDefault();

      // Lấy thông tin gymLocation
      const gymLocation = document.getElementById('gym-location').value;

      // Hiển thị modal đánh giá
      const reviewModal = new bootstrap.Modal(document.getElementById('review-modal'));
      reviewModal.show();

      // Hiển thị gymLocation trong modal đánh giá
      const gymLocationInReviewModal = document.getElementById('gym-location-in-review-modal');
      gymLocationInReviewModal.innerHTML = `<strong>Cơ sở tập: ${gymLocation}</strong>`;
    });

  });

})()

$(function () {
  $("#include-navbar").load("navbar.html");
  $("#include-footer").load("footer.html");
});

// JS FOR USER PROFILE PAGE

//change avatar
let user_img = document.getElementById('user-ava');
let input_img = document.getElementById('input-img');
input_img.onchange = (e) =>{
  if(input_img.files[0])
    user_img.src = URL.createObjectURL(input_img.files[0]);
};
// change password tab
const togglePassword = document.querySelector("#togglePassword");
const password = document.querySelector("#password");
togglePassword.addEventListener("click", function () {
  const type = password.getAttribute("type") === "password" ? "text" : "password";
  password.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

const toggleNewPassword = document.querySelector("#toggleNewPassword");
const new_password = document.querySelector("#new-password");
toggleNewPassword.addEventListener("click", function () {
  const type = new_password.getAttribute("type") === "password" ? "text" : "password";
  new_password.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});

const toggleRePassword = document.querySelector("#toggleRePassword");
const re_password = document.querySelector("#re-password");
toggleRePassword.addEventListener("click", function () {
  const type = re_password.getAttribute("type") === "password" ? "text" : "password";
  re_password.setAttribute("type", type);
  this.classList.toggle("bi-eye");
});


const form = document.querySelector("#change-pw-form");
form.addEventListener('submit', function (e) {
  e.preventDefault();
});