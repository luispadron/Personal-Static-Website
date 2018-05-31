$(function () {
    $("#contactForm input,#contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function ($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function ($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            let name = $("input#name").val();
            let email = $("input#email").val();
            let message = $("textarea#message").val();
            let firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            let formUrl = "https://docs.google.com/forms/d/e/" +
                "1FAIpQLSebVgG4jAH0VlRzzYSyZAUh2pkMvQMycf7lWwQKVTBnlbLwzA/" +
                "formResponse?entry.1466349692=" + name + "&entry.99849588=" +
                email + "&entry.1105109995=" + message;

            // Don't care about success or failure here
            // Since github static pages do not allow this, we just
            // need to send the above URL to google forms and it will
            // create a new form for us.
            $.ajax({
                url: formUrl,
                type: "GET",
                cache: false
            });

            // Enable button & show success message
            $("#btnSubmit").attr("disabled", false);
            $('#success').html("<div class='alert alert-success'>");
            $('#success > .alert-success')
                .append("<strong>Your message has been sent. </strong>");
            $('#success > .alert-success')
                .append('</div>');
            // Remove success alert after certain amount of time
            setTimeout(function() {
                $('#success').fadeOut()
            }, 4000)

            //clear all fields
            $('#contactForm').trigger("reset");
        },
        filter: function () {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function (e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function () {
    $('#success').html('');
});
