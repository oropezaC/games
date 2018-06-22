$('select.dropdown')
  .dropdown()
;

$('.ui.form')
  .form({
    fields: { user     : 'empty', pass : ['minLength[8]', 'empty'],
      terms    : 'checked'
      }
  });

