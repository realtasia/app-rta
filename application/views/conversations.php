<?php defined('SYSPATH') or die('No direct script access.'); ?>
<!--<pre data-bind="text:ko.toJSON(user().connections)"></pre>-->
<!--<pre data-bind="text:ko.toJSON(user().actions)"></pre>-->
<div data-bind="with:inbox">
    <div class="navbar navbar-static-top" data-bind="style:{marginTop:RTApp.isSmallerThanTablet ? '0' : '10px'}">
        <div class="navbar-inner">
            <div class="container">
                <a class="brand" href="#">Conversations&nbsp;<i class="icon-circle-plus"></i></a>
                <!--            <ul class="nav">
                                <li><a href="#">Create Message</a></li>
                            </ul>-->
                <a class="btn btn-navbar" data-toggle="collapse" data-target="#sidebar-collapse">
                    <i class="icon-inbox"></i>
                </a>
                <div class="nav-collapse collapse hidden-desktop" id="sidebar-collapse" style="background:#484747 !important;z-index:1">
                    <ul class="media-list nav nav-pills" id="message-topbar">
                        <!--ko serverForEach:{name:'inboxConversation', foreach:conversations}-->
                        <!--/ko-->
                        <li>
                            <p href="#" class="text-center" data-bind="ifnot:hasMoreConversations, text:!!conversations().length ? 'There are no more conversations' : 'There are no conversations'"></p>
                            <a href="#" class="text-center" data-bind="if:hasMoreConversations">Load earlier conversations</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid" data-bind="style:{marginTop:RTApp.viewport.width() < 600 ? 'auto' : '10px'}">
        <div class="row-fluid">
            <div class="span4 visible-desktop outerBox" style="margin-left:0;">
                <ul class="media-list nav nav-pills nav-stacked " id="message-sidebar" data-bind="style:{height:RTApp.viewport.height()*.8 + 'px'}, visible:RTApp.viewport.width() > 600,scroll:true">
                    <!--ko serverForEach:{name:'inboxConversation', foreach:conversations}-->
                    <!--/ko-->
                    <li>
                        <p href="#" class="text-center" data-bind="ifnot:hasMoreConversations, text:!!conversations().length ? 'There are no more conversations' : 'There are no conversations'"></p>
                        <a href="#" class="text-center" data-bind="if:hasMoreConversations">Load earlier conversations</a>
                    </li>
                </ul>
            </div>
            <div class="span8 fill clearfix" style="margin-right:0" data-bind="css:{span11:RTApp.viewport.width() <= 800, span8:RTApp.viewport.width() > 800}">
                <h3 class="muted" data-bind="visible:!messages().length">Choose a conversation.</h3>
                <ul class="media-list" id="message-window" data-bind="style:{height:RTApp.viewport.height()*.8 + 'px'},scroll:{start:'bottom'}, if:!!messages().length" style="background:white;">
                    <li>
                        <p href="#" class="text-center" data-bind="ifnot:hasMoreMessages">There are no previous messages</p>
                        <a href="#" class="text-center" data-bind="if:hasMoreMessages">See previous messages</a>
                    </li>
                    <!--ko serverForEach:{name:'inboxMessage', foreach:messages}-->
                    <!--/ko-->
                    <li class="media">
                        <form>
                            <div class="pull-left">
                                <img data-bind="getAvatar:{context:RTApp.user, size:40}, attr:{alt:RTApp.user().name}" width="40px" height="40px" />
                            </div>
                            <div class="media-body">
                                <textarea data-bind="expand:true, value:commentText"></textarea>
                                <div class="btn-toolbar">
                                    <div class="btn-group pull-right" style="margin-right:20px;">
                                        <button type="submit" data-bind="hasfocus:true" class="btn">Send</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</div>

<script type="text/html" id="inboxConversation">
    <li data-bind="css:{'alert alert-info' : unread() === RTApp.user()._id()}, click:$parent.selectConversation">
    <a class="media" href="#">
    <div class="pull-left">
    <img data-bind="getAvatar : {context:$data.recipient, size:40}, attr:{alt:recipient.name}" width="40px" height="40px">
    </div>
    <div class="media-body">
    <h5 style="margin:1px;"><span data-bind="text:recipient.name"></span> <small class="text-info pull-right" style="margin-top:5px;"><time data-bind="timeago:modified"></time></small></h5>
    <p class="messageContent clearfix">
    <small class="text-info span12">
    <i class="icon-reply" style="color:#999" data-bind="visible:lastMessage._id() === RTApp.user()._id()"></i>
    &nbsp;<span data-bind="text:excerpt"></span>
    </small>
    </p>
    </div>
    </a>
    </li>
</script>
<script type="text/html" id="inboxMessage">
    <li class="media">
    <div class="pull-left">
    <img data-bind="getAvatar : {context:$data.user, size:40}, attr:{alt:user.name}" width="40px" height="40px">
    </div>
    <div class="media-body">
    <h5 style="margin:1px;"><span data-bind="text:user.name"></span>
    <small class="muted pull-right" style="margin:5px 20px 0 0;"><time data-bind="timeago:created"></time></small></h5>
    <blockquote data-bind="html:excerpt">
    </blockquote>
    </div>
    <hr>
    </li>
</script>