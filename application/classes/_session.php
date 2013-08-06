<?php

class Session {

    private static $db;
    private $current_session = [];
    public static $instances = [];

    public static function instance($db = null)
    {
        if (empty(static::$instances))
        {
            static::$instances[] = new self($db);
        }
        return static::$instances[0];
    }

    public function __construct($db = null)
    {
        if (!$db)
        {
            $db = mysql_connect('127.0.0.1', 'root', '121481');
            mysql_select_db('app_sessions', $db);
        }
        static::$db = $db;
        return $this->handle();
    }

    private function error($msg, $level = E_USER_ERROR)
    {
        error_log($msg);
        trigger_error($msg, $level);
    }

    private function query($sql)
    {
        if (static::$db)
        {
            return mysql_query($sql, static::$db);
        }
        else
        {
            return mysql_query($sql);
        }
    }

    private function escape($val)
    {
        if (static::$db)
        {
            return mysql_real_escape_string($val, static::$db);
        }
        else
        {
            return mysql_real_escape_string($val);
        }
    }

    public function create()
    {
        if ($this->query("
CREATE TABLE `sessions` (
id CHAR(32) NOT NULL,
data TEXT NOT NULL,
modified TIMESTAMP NOT NULL,
PRIMARY KEY (`id`)
) Engine=MyISAM
") === false)
        {
            $this->error("Failed setting up session table");
        }
        return $this;
    }

    public function handle()
    {
        if (session_set_save_handler(
                        array($this, 'open'), array($this, 'close'), array($this, 'read'), array($this, 'write'), array($this, 'destroy'), array($this, 'gc')
                ) === false)
        {
            $this->error("Failed setting save handler");
        }
        session_start();
        return $this;
    }

    public function open($save_path, $session_name)
    {
        return true;
    }

    public function close()
    {
        if(!empty($this->current_session))
        {
            return $this->gc(ini_get('session.gc_maxlifetime'));
        }

        return false;
    }

    public function read($key)
    {
        $result = $this->query("SELECT * FROM `sessions` WHERE id = '$key' LIMIT 1");
        if ($result === false)
        {
            $this->error("Error reading from session: " . mysql_error());
        }
        $res = mysql_fetch_array($result);
        mysql_free_result($result);
        if (!empty($res))
        {
            // no data
            $this->current_session = $res;
        }

        return Arr::get($this->current_session, 'data', '');
    }

    public function write($id, $val)
    {
        if (!empty($this->current_session))
        {
            if (\Arr::get($this->current_session, 'id') != $id)
            {
                // user is starting a new session with previous data
                $this->current_session = [];
            }
        }

        $val = $this->escape($val);

        if(empty($this->current_session))
        {
            $sql = "INSERT INTO `sessions` (`id`, `data`, `modified`) VALUES ('$id', '$val', " . time() . ");";
        }
        else
        {
            $sql = "UPDATE `sessions` SET `data`='$val', `modified`=" . time() . " WHERE `id`='$id';";
        }

        return mysql_query($sql, static::$db) ? true : $this->error("Error writing to session: " . mysql_error());
    }

    public function destroy($key)
    {
        return mysql_query("DELETE FROM `sessions` WHERE `id`='$key'") ? true : $this->error("Error deleting from session: " . mysql_error());
    }

    public function gc($maxlifetime)
    {
        $sql = "DELETE FROM `sessions` WHERE `modified` < DATE_SUB(" . time() . ", INTERVAL $maxlifetime SECOND)";
        return $this->query($sql) ? true : $this->error("Error garbage collecting session: " . mysql_error());
    }

    public function set($key, $value)
    {
        $_SESSION[$key] = $value;
    }

    public function get($key)
    {
        return Arr::get($_SESSION, $key);
    }

    public function delete($key = null)
    {
        if ($key)
        {
            unset($_SESSION[$key]);
            return;
        }

        return session_unset();
    }

    public function reset()
    {
        return session_destroy();
    }

    public static function as_array()
    {
        return $_SESSION;
    }

    public function __destruct ()
    {
        @session_write_close();
    } // __destruct


}