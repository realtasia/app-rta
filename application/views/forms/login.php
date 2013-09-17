<script type="text/javascript">

    $(document).ready(function() {
        var t = window.RTApp, cf = t.currentForm;
        cf(new RT.Forms.Login(t));

    });
</script>
<div class="container-fluid">
    <div style="display:none" data-bind="visible:RTApp.user() && RTApp.autoLogin()">
        <section data-role="page" data-bind="if:RTApp.currentForm">
            <h4 class="contentArea" data-bind="ifnot:$root.isError" style="margin-bottom: 0;">
                <div class="media" data-bind="with: RTApp.user">
                    <div class="pull-left">
                        <img style="width:40px; height:40px;" data-bind="getAvatar : {context:$data, size:40}, attr:{alt:$data.name}, event:{load:function(){$('#login_remember').click()}}" width="40" height="40">
                    </div>
                    <div class="media-body">
                        Hi <span data-bind="text:$data.first_name"></span>, for your security, please enter your password to continue.
                    </div>
                </div>
                <p style="margin-top:10px;"><small><a href="#" data-bind="click:function(){return RTApp.user(null);}">Log in as different user</a> | <a href="#">Log Out</a></small></p>
            </h4>
            <form class="contentArea" style="margin-bottom: 0;font-size:110%" data-bind="submit: RTApp.currentForm().login">
                <p class="text-error" data-bind="visible: window['RTApp'].isError">
                    <strong data-bind="text: window['RTApp'].ajaxMessage">
                    </strong>
                </p>
                <div class="control-group" data-bind="validationElement: RTApp.currentForm().password">
                    <label class="control-label" for="inputPassword">Password</label>
                    <div class="controls">
                        <input type="password" id="inputPassword" placeholder="Realtasia Password" data-bind="valueWithInit : RTApp.currentForm().password" />
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <label class="checkbox">
                            <input type="checkbox" name="remember" id="login_remember" /> Remember me</label>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <button class="btn-rta btn btn-large btn-rta-login" data-bind="click: RTApp.currentForm().auto_login" style="box-shadow: 1px 1px 3px #ddd;">
                            <span class="fb-auth-button">login with realtasia</span>
                        </button>
                        <span>
                            <i class="icon-spin icon spinner" style="display:none" id="rtLoginLoader"></i>
                        </span>
                    </div>
                </div>
                <small class="muted" style="margin: 0">Forgotten your Realtasia password? <a onclick="javascript:return false;" href="/user/reset_password">Click here</a> to reset it.
                    <!--<br style="margin-bottom: 10px" />
                    <button class="btn-fb btn btn-small btn-fb-login">
                    <span class="fb-auth-button" id="fb-auth">login with facebook</span>
                    </button>
                    <small class="muted" id="fb-auth-container"> Only if you have registered using facebook.</small>-->
                </small>
                <?php echo form::hidden('state', Security::token()); ?>
            </form>
        </section>
    </div>
    <div class="row-fluid">
        <div style="display:none;margin-top:10%" class="contentArea centralize" data-bind="if:RTApp.user() && !RTApp.autoLogin(), visible:RTApp.user, flash:RTApp.user">
            <h4>Hi <span data-bind="text:RTApp.user().first_name"></span>, you have successfully signed in!</h4>
            <a data-bind="attr:{href:RTApp.user().uri}" href="#" class="btn span12 btn-info btn-large" style="margin:0"><i class="icon-home"></i>&nbsp;Go to Home</a>
        </div>
    </div>
    <div style="display:none" data-bind="visible:!RTApp.user() && !RTApp.autoLogin()">
        <section data-role="page" data-bind="with:RTApp.currentForm">
            <h4 class="contentArea" data-bind="ifnot:$root.isError" style="margin-bottom: 0;">
                Log In.</h4>
            <form class="contentArea" style="margin-bottom: 0;font-size:110%" data-bind="submit: login">

                <p class="text-error" data-bind="visible: window['RTApp'].isError">
                    <strong data-bind="text: window['RTApp'].ajaxMessage">
                    </strong>
                </p>
                <div class="control-group" data-bind="validationElement: username">
                    <label class="control-label" for="inputEmail">Email or Username</label>
                    <div class="controls">
                        <input type="text" id="inputEmail" placeholder="Realtasia Email or Username" data-bind="valueWithInit : username" />
                    </div>
                </div>
                <div class="control-group" data-bind="validationElement: password">
                    <label class="control-label" for="inputPassword">Password</label>
                    <div class="controls">
                        <input type="password" id="inputPassword" placeholder="Realtasia Password" data-bind="valueWithInit : password" />
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <label class="checkbox">
                            <input type="checkbox" name="remember" id="login_remember" /> Remember me</label>
                    </div>
                </div>
                <div class="control-group">
                    <div class="controls">
                        <button class="btn-rta btn btn-large btn-rta-login" data-bind="click: login" style="box-shadow: 1px 1px 3px #ddd;">
                            <span class="fb-auth-button">login with realtasia</span>
                        </button>
                        <span>
                            <i class="icon-spin icon spinner" style="display:none" id="rtLoginLoader"></i>
                        </span>
                    </div>
                </div>
                <small class="muted" style="margin: 0">Forgotten your Realtasia password? <a onclick="javascript:return false;" href="/user/reset_password">Click here</a> to reset it.
                    <!--<br style="margin-bottom: 10px" />
                    <button class="btn-fb btn btn-small btn-fb-login">
                    <span class="fb-auth-button" id="fb-auth">login with facebook</span>
                    </button>
                    <small class="muted" id="fb-auth-container"> Only if you have registered using facebook.</small>-->
                </small>
                <?php echo form::hidden('state', Security::token()); ?>
            </form>
        </section>
    </div>
</div>
<noscript>
    <div class="outerBox" style="margin-top:10%">
        <div class="contentArea">
            <h2 class="text-center text-error"><i class="icon-exclamation-sign"></i> Please enable javascript to continue...</h2>
        </div>
    </div>
</noscript>