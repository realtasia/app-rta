<h1 style="margin-top: 50px">Test Logins</h1>
<button class="btn btn-info btn-large" id="testlogin">Login</button>
<button class="btn btn-info btn-large" id="testlogout">Logout</button>
<br>
<hr>
<pre id="api"></pre>
<pre id="cu"></pre>
<script type="text/javascript">
    $(document).ready(function() {
        checkApi = function() {
            return     $.get('/sessionapi', function(r) {
                $("#api").text(r);
            });
        };

        checkCu = function() {
            return $.get('/sessioncu', function(r) {
                $("#cu").text(r);
            });
        };

        checkApi() && checkCu();

        $('#testlogin').click(function(e){
            e.preventDefault();
            $.post('/login', {
                username: 'jason-nathan',
                password: '90220964'
            }, function(r){
                return checkApi() && checkCu();
            });
        });

        $('#testlogout').click(function(e){
            e.preventDefault();
            $.post('/logout', function(r){
                return checkApi() && checkCu();
            });
        });


    });
</script>