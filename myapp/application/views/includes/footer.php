</main>
<footer class="mt-auto text-white-50">
</footer>
</div>



</body>
<!--- Clork Javascript -->
<script type="text/javascript" src="<?php echo base_url('assets/js/clock-script.js'); ?>" language="javascript">
</script>
<script>
(function() {
    'use strict';
    const forms = document.getElementsByClassName('needs-validation');
    // Example starter JavaScript for disabling form submissions if there are invalid fields
    window.addEventListener('load', function() {
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
            form.addEventListener('submit', function(event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
                if (form.checkValidity() === true) {
                    event.preventDefault();
                    var DECREMENT_BY_SECS = $("#DECREMENT_BY_SECS").val();
                    $.ajax({
                        type: "POST",
                        url: '<?php echo base_url() ?>welcome/input_seconds',
                        data: {
                            DECREMENT_BY_SECS: DECREMENT_BY_SECS
                        },
                        success: function(data) {
                            $('#cd_message').show();
                            $('#results').html(data);
                            $('#results').attr("data-id", data);
                            $('#results').attr("data-to-check", true);
                        },
                        error: function() {
                            alert('fail');
                        }
                    });
                }
            }, false);
        });
    }, false);
})();
</script>

</html>