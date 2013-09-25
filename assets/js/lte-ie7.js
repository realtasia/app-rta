/* Load this script using conditional IE comments if you need to support IE 7 and IE 6. */

window.onload = function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'Icon-Custom\'">' + entity + '</span>' + html;
	}
	var icons = {
			'icon-word' : '&#xe001;',
			'icon-xls' : '&#xe002;',
			'icon-ppt' : '&#xe003;',
			'icon-pdf' : '&#xe000;',
			'icon-group' : '&#xf0c0;',
			'icon-compass' : '&#xe004;',
			'icon-map-marker' : '&#xe005;',
			'icon-minus' : '&#xf068;',
			'icon-upload-alt' : '&#xf093;',
			'icon-eye-close' : '&#xe008;',
			'icon-eye-open' : '&#xe009;',
			'icon-caret-down' : '&#xf0d7;',
			'icon-info-circle' : '&#xe00a;',
			'icon-info-sign' : '&#xe00b;',
			'icon-info' : '&#xf129;',
			'icon-spinner' : '&#xe00c;',
			'icon-inbox' : '&#xf01c;',
			'icon-reply' : '&#xe00d;',
			'icon-checkmark' : '&#xe00e;',
			'icon-checkmark-2' : '&#xe00f;',
			'icon-ok-sign' : '&#xe010;',
			'icon-close' : '&#xe011;',
			'icon-exclamation-sign' : '&#xe012;',
			'icon-spam' : '&#xe013;',
			'icon-signin' : '&#xe014;',
			'icon-signout' : '&#xe015;',
			'icon-envelope' : '&#xf003;',
			'icon-wrench' : '&#xe016;',
			'icon-cog' : '&#xf013;',
			'icon-cogs' : '&#xf085;',
			'icon-user' : '&#xe017;',
			'icon-group-2' : '&#xe018;',
			'icon-user-business' : '&#xe019;',
			'icon-dollar' : '&#xf155;',
			'icon-menu-mobile' : '&#xe01a;',
			'icon-list-alt' : '&#xf022;',
			'icon-comments-alt' : '&#xe01b;',
			'icon-hand-right' : '&#xf0a4;',
			'icon-hand-up' : '&#xf0a6;',
			'icon-pushpin' : '&#xe01c;',
			'icon-dashboard' : '&#xf0e4;',
			'icon-globe' : '&#xe01d;',
			'icon-mobile' : '&#xe01e;',
			'icon-share-alt' : '&#xf064;',
			'icon-paperclip' : '&#xe01f;',
			'icon-magic-alt' : '&#xe020;',
			'icon-magic' : '&#xf0d0;',
			'icon-ellipsis-vertical' : '&#xf142;',
			'icon-list' : '&#xe021;',
			'icon-camera' : '&#xf030;',
			'icon-pencil' : '&#xf040;',
			'icon-rss-sign' : '&#xe022;',
			'icon-tasks' : '&#xf0ae;',
			'icon-qrcode' : '&#xe023;',
			'icon-camera-retro' : '&#xf083;',
			'icon-office' : '&#xe024;',
			'icon-briefcase' : '&#xf0b1;',
			'icon-undo' : '&#xe026;',
			'icon-off' : '&#xe027;',
			'icon-bullhorn' : '&#xf0a1;',
			'icon-trophy' : '&#xe028;',
			'icon-phone' : '&#xe029;',
			'icon-caret-left' : '&#xf0d9;',
			'icon-caret-right' : '&#xf0da;',
			'icon-caret-up' : '&#xf0d8;',
			'icon-download' : '&#xe02a;',
			'icon-legal' : '&#xe02b;',
			'icon-key' : '&#xf084;',
			'icon-facebook' : '&#xf09a;',
			'icon-twitter' : '&#xf099;',
			'icon-youtube' : '&#xf167;',
			'icon-flickr' : '&#xe02c;',
			'icon-wordpress' : '&#xe02d;',
			'icon-chevron-left' : '&#xf053;',
			'icon-ban' : '&#xe02f;',
			'icon-double-angle-down' : '&#xf103;',
			'icon-calendar' : '&#xf073;',
			'icon-picassa' : '&#xe030;',
			'icon-lock' : '&#xe025;',
			'icon-spinner-alt' : '&#xe031;',
			'icon-vcard' : '&#xe032;',
			'icon-circle-minus' : '&#xe033;',
			'icon-new' : '&#xe034;',
			'icon-plus' : '&#xe035;',
			'icon-circle-plus' : '&#xe036;',
			'icon-circle-arrow-left' : '&#xe037;',
			'icon-circle-arrow-right' : '&#xe038;',
			'icon-circle-arrow-down' : '&#xe039;',
			'icon-circle-arrow-up' : '&#xe03a;',
			'icon-double-angle-up' : '&#xf102;',
			'icon-refresh' : '&#xe03b;',
			'icon-trash' : '&#xe03c;',
			'icon-warning-sign' : '&#xe02e;',
			'icon-close-sign' : '&#xe006;',
			'icon-picasa' : '&#xe007;',
			'icon-google-plus' : '&#xf0d5;',
			'icon-google-drive' : '&#xe03d;',
			'icon-check' : '&#xe03e;',
			'icon-uncheck' : '&#xe03f;',
			'icon-status' : '&#xe040;',
			'icon-lamp' : '&#xe041;',
			'icon-lightbulb' : '&#xf0eb;',
			'icon-certificate' : '&#xe042;',
			'icon-phone-office' : '&#xe043;',
			'icon-condominium' : '&#xe044;',
			'icon-calculator' : '&#xe045;',
			'icon-bell' : '&#xf0a2;'
		},
		els = document.getElementsByTagName('*'),
		i, attr, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		attr = el.getAttribute('data-icon');
		if (attr) {
			addIcon(el, attr);
		}
		c = el.className;
		c = c.match(/icon-[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
};