const setText = (id, value) => {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
};

/**
 * Populates the Hero section with data from labels.json.
 *
 * @param {Object} heroData - The hero section data.
 * @param {string} heroData.title - Main heading text.
 * @param {string} heroData.subtitle - Subtitle text.
 * @param {string} heroData.appointmentButton - Label for appointment button.
 * @param {string} heroData.contactButton - Label for contact button.
 * @returns {void}
 */
export function populateHero(heroData) {
  if (!heroData) return;

  setText('heroTitle', heroData.title);
  setText('heroSubtitle', heroData.subtitle);
  setText('heroAppointmentBtn', heroData.appointmentButton);
  setText('heroContactBtn', heroData.contactButton);
}

/**
 * Populates the services heading and service cards.
 *
 * @param {Object} servicesData - The services section data.
 * @param {string} servicesData.heading - Section heading text.
 * @param {Array<Object>} servicesData.items - Services to display.
 * @returns {void}
 */
export function populateServices(servicesData) {
  if (!servicesData) return;

  setText('servicesHeading', servicesData.heading);
  const serviceList = document.getElementById('servicesList');
  if (!serviceList || !Array.isArray(servicesData.items)) return;

  const cards = servicesData.items.filter(Boolean).map((service) => {
    const column = document.createElement('div');
    column.className = 'col-md-4';
    const card = document.createElement('article');
    card.className = 'card h-100 border-0 shadow-sm text-center';
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body p-4';
    const icon = document.createElement('i');
    icon.className = `fas ${service.icon || ''} fa-3x mb-3 text-${service.color || 'primary'}`;
    icon.setAttribute('aria-hidden', 'true');
    const title = document.createElement('h3');
    title.className = 'h4';
    title.textContent = service.title;
    const description = document.createElement('p');
    description.className = 'mb-0';
    description.textContent = service.description;
    cardBody.append(icon, title, description);
    card.append(cardBody);
    column.append(card);
    return column;
  });

  serviceList.replaceChildren(...cards);
}

/**
 * Populates the About section.
 *
 * @param {Object} aboutData - The About section data.
 * @param {string} aboutData.heading - Section heading text.
 * @param {string} aboutData.description - Section description.
 * @returns {void}
 */
export function populateAbout(aboutData) {
  if (!aboutData) return;

  setText('aboutHeading', aboutData.heading);
  setText('aboutDescription', aboutData.description);
}

/**
 * Populates the appointment form labels and submit button.
 *
 * @param {Object} apptData - The appointment section data.
 * @param {string} apptData.heading - Section heading text.
 * @param {Object.<string, string>} apptData.fields - Form field labels.
 * @param {string} apptData.submitButton - Submit button label.
 * @returns {void}
 */
export function populateAppointment(apptData) {
  if (!apptData) return;

  const labelIds = { name: 'apptNameLabel', mobile: 'apptMobileLabel', age: 'apptAgeLabel', sex: 'apptSexLabel', date: 'apptDateLabel', time: 'apptTimeLabel', department: 'apptDepartmentLabel', notes: 'apptNotesLabel' };
  setText('appointmentHeading', apptData.heading);
  if (apptData.fields) {
    Object.entries(apptData.fields).forEach(([field, label]) => {
      if (labelIds[field]) setText(labelIds[field], label);
    });
  }
  setText('apptSubmitBtn', apptData.submitButton);
}

/**
 * Populates the appointment-time select with slots inside clinic working hours.
 *
 * @param {Object} slotsData - The appointment slot configuration from slots.json.
 * @param {Object} slotsData.workingHours - Clinic opening and closing times.
 * @param {string} slotsData.workingHours.start - Opening time in HH:MM format.
 * @param {string} slotsData.workingHours.end - Closing time in HH:MM format.
 * @param {string[]} slotsData.availableSlots - Available appointment times in HH:MM format.
 * @returns {void}
 */
export function populateAppointmentSlots(slotsData) {
  if (!slotsData || !slotsData.workingHours || !Array.isArray(slotsData.availableSlots)) return;

  const timeSelect = document.getElementById('appt-time');
  const dateSelect = document.getElementById('apptDate');
  const { start, end } = slotsData.workingHours;
  if (!timeSelect || !dateSelect || !start || !end || start > end) return;

  const resetTimeOptions = () => {
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a date first';
    timeSelect.replaceChildren(placeholder);
    timeSelect.disabled = true;
  };

  const populateTimes = () => {
    if (!dateSelect.value) {
      resetTimeOptions();
      return;
    }

    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = 'Select a time';
    const options = slotsData.availableSlots
      .filter((slot) => typeof slot === 'string' && slot >= start && slot <= end)
      .sort()
      .map((slot) => {
        const option = document.createElement('option');
        option.value = slot;
        option.textContent = slot;
        return option;
      });

    timeSelect.replaceChildren(placeholder, ...options);
    timeSelect.disabled = false;
  };

  dateSelect.onchange = populateTimes;
  populateTimes();
}

/**
 * Populates the appointment-date select with available non-holiday dates.
 *
 * @param {Object} slotsData - The appointment slot configuration from slots.json.
 * @param {string[]} slotsData.availableDates - Available dates in YYYY-MM-DD format.
 * @param {string[]} slotsData.holidays - Dates unavailable for appointments.
 * @returns {void}
 */
export function populateAppointmentDates(slotsData) {
  if (!slotsData || !Array.isArray(slotsData.availableDates)) return;

  const dateSelect = document.getElementById('apptDate');
  if (!dateSelect) return;

  const holidays = new Set(Array.isArray(slotsData.holidays) ? slotsData.holidays : []);
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC'
  });
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = 'Select a date';
  const options = slotsData.availableDates
    .filter((date) => typeof date === 'string' && !holidays.has(date) && !Number.isNaN(Date.parse(`${date}T00:00:00Z`)))
    .sort()
    .map((date) => {
      const option = document.createElement('option');
      option.value = date;
      option.textContent = formatter.format(new Date(`${date}T00:00:00Z`));
      return option;
    });

  dateSelect.replaceChildren(placeholder, ...options);
}

/**
 * Populates the contact form labels and submit button.
 *
 * @param {Object} contactData - The contact section data.
 * @param {string} contactData.heading - Section heading text.
 * @param {Object.<string, string>} contactData.fields - Form field labels.
 * @param {string} contactData.submitButton - Submit button label.
 * @returns {void}
 */
export function populateContact(contactData) {
  if (!contactData) return;

  setText('contactHeading', contactData.heading);
  if (contactData.fields) {
    setText('contactNameLabel', contactData.fields.name);
    setText('contactEmailLabel', contactData.fields.email);
    setText('contactMessageLabel', contactData.fields.message);
  }
  setText('contactSubmitBtn', contactData.submitButton);
}

/**
 * Populates the thank-you message.
 *
 * @param {Object} thankData - The thank-you section data.
 * @param {string} thankData.heading - Heading text.
 * @param {string} thankData.message - Confirmation message.
 * @param {string} thankData.backButton - Back button label.
 * @returns {void}
 */
export function populateThankYou(thankData) {
  if (!thankData) return;

  setText('thankyouHeading', thankData.heading);
  setText('thankyouMessage', thankData.message);
  setText('thankyouBackBtn', thankData.backButton);
}

/**
 * Populates the testimonials carousel.
 *
 * @param {Object} testimonialsData - The testimonials section data.
 * @param {string} testimonialsData.heading - Section heading text.
 * @param {Array<Object>} testimonialsData.quotes - Testimonial quotes.
 * @returns {void}
 */
export function populateTestimonials(testimonialsData) {
  if (!testimonialsData) return;

  setText('testimonialsHeading', testimonialsData.heading);
  const carousel = document.getElementById('testimonialsList');
  if (!carousel || !Array.isArray(testimonialsData.quotes)) return;

  const indicators = document.createElement('div');
  indicators.className = 'carousel-indicators';
  const inner = document.createElement('div');
  inner.className = 'carousel-inner text-center px-5';

  testimonialsData.quotes.filter(Boolean).forEach((quote, index) => {
    const indicator = document.createElement('button');
    indicator.type = 'button';
    indicator.dataset.bsTarget = '#testimonialsList';
    indicator.dataset.bsSlideTo = String(index);
    indicator.setAttribute('aria-label', `Testimonial ${index + 1}`);
    if (index === 0) {
      indicator.className = 'active';
      indicator.setAttribute('aria-current', 'true');
    }
    indicators.append(indicator);

    const item = document.createElement('div');
    item.className = `carousel-item${index === 0 ? ' active' : ''}`;
    const quoteText = document.createElement('blockquote');
    quoteText.className = 'blockquote';
    const text = document.createElement('p');
    text.textContent = `“${quote.text}”`;
    const author = document.createElement('footer');
    author.className = 'blockquote-footer';
    author.textContent = quote.author;
    quoteText.append(text, author);
    item.append(quoteText);
    inner.append(item);
  });

  const createControl = (direction, label) => {
    const control = document.createElement('button');
    control.className = `carousel-control-${direction}`;
    control.type = 'button';
    control.dataset.bsTarget = '#testimonialsList';
    control.dataset.bsSlide = direction;
    const icon = document.createElement('span');
    icon.className = `carousel-control-${direction}-icon`;
    icon.setAttribute('aria-hidden', 'true');
    const text = document.createElement('span');
    text.className = 'visually-hidden';
    text.textContent = label;
    control.append(icon, text);
    return control;
  };

  carousel.replaceChildren(indicators, inner, createControl('prev', 'Previous'), createControl('next', 'Next'));
}

/**
 * Populates the FAQ heading, accordion, and search behavior.
 *
 * @param {Object} faqData - The FAQ section data.
 * @param {string} faqData.heading - Section heading text.
 * @param {Array<Object>} faqData.items - FAQ items with questions and answers.
 * @returns {void}
 */
export function populateFAQ(faqData) {
  if (!faqData) return;

  setText('faqHeading', faqData.heading);
  const search = document.getElementById('faqSearch');
  const accordion = document.getElementById('faqAccordion');
  if (!accordion || !Array.isArray(faqData.items)) return;

  const render = (items) => {
    const entries = items.filter(Boolean).map((item, index) => {
      const itemElement = document.createElement('div');
      itemElement.className = 'accordion-item';
      const heading = document.createElement('h3');
      heading.className = 'accordion-header';
      const button = document.createElement('button');
      const collapseId = `faq-collapse-${index}`;
      button.className = `accordion-button${index ? ' collapsed' : ''}`;
      button.type = 'button';
      button.dataset.bsToggle = 'collapse';
      button.dataset.bsTarget = `#${collapseId}`;
      button.textContent = item.question;
      const collapse = document.createElement('div');
      collapse.id = collapseId;
      collapse.className = `accordion-collapse collapse${index ? '' : ' show'}`;
      collapse.dataset.bsParent = '#faqAccordion';
      const body = document.createElement('div');
      body.className = 'accordion-body';
      body.textContent = item.answer;
      heading.append(button);
      collapse.append(body);
      itemElement.append(heading, collapse);
      return itemElement;
    });
    accordion.replaceChildren(...entries);
  };

  if (search) {
    search.oninput = () => {
      const query = search.value.trim().toLowerCase();
      render(faqData.items.filter((item) => item?.question?.toLowerCase().includes(query)));
    };
  }
  render(faqData.items);
}

/**
 * Populates the map heading and embedded map source.
 *
 * @param {Object} mapData - The map section data.
 * @param {string} mapData.heading - Section heading text.
 * @param {string} mapData.iframeSrc - Embedded map URL.
 * @returns {void}
 */
export function populateMap(mapData) {
  if (!mapData) return;

  setText('mapHeading', mapData.heading);
  const mapIframe = document.getElementById('mapIframe');
  if (mapIframe && mapData.iframeSrc) mapIframe.src = mapData.iframeSrc;
}

/**
 * Populates the footer text.
 *
 * @param {Object} footerData - The footer data.
 * @param {string} footerData.text - Footer text.
 * @returns {void}
 */
export function populateFooter(footerData) {
  if (!footerData) return;

  setText('footerText', footerData.text);
}

/**
 * Populates the WhatsApp link.
 *
 * @param {Object} whatsappData - The WhatsApp data.
 * @param {string} whatsappData.link - WhatsApp URL.
 * @returns {void}
 */
export function populateWhatsApp(whatsappData) {
  if (!whatsappData) return;

  const whatsappLink = document.getElementById('whatsappLink');
  if (whatsappLink && whatsappData.link) whatsappLink.href = whatsappData.link;
}

const setFieldError = (input, message) => {
  if (!input) return;

  const error = document.getElementById(`${input.id}-error`);
  input.classList.toggle('is-invalid', Boolean(message));
  if (error) error.textContent = message;
};

export function validateAppointmentForm() {
  const mobile = document.getElementById('appt-mobile');
  const age = document.getElementById('appt-age');
  const department = document.getElementById('appt-department');
  if (!mobile || !age || !department) return false;

  const mobileValid = /^\d{10}$/.test(mobile.value.trim());
  const ageNumber = Number(age.value);
  const ageValid = Number.isInteger(ageNumber) && ageNumber >= 1 && ageNumber <= 120;
  const departmentValid = department.value !== '';

  setFieldError(mobile, mobileValid ? '' : 'Enter a valid 10-digit mobile number.');
  setFieldError(age, ageValid ? '' : 'Enter an age between 1 and 120.');
  setFieldError(department, departmentValid ? '' : 'Please select a department.');
  return mobileValid && ageValid && departmentValid;
}
