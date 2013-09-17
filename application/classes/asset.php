<?php

class Asset extends Kohana_Asset{
	/**
	 * Create inline HTML
	 *
	 * @param   string   $type
	 * @param   string   $content
	 * @return  string

	public static function html_inline($type, $content)
	{

        return $content;
		// Set the proper inline HTML
		switch ($type)
		{
			case Assets::JAVASCRIPT:
				$html = "<script type=\"text/javascript\">\n".$content."\n</script>";
			break;
			case Assets::STYLESHEET:
				$html = "<style type=\"text/css\">\n".$content."\n</style>";
			break;
		}

		return $html;
	}
	 */
}