        <ul class="nav nav-pills" data-bind="foreach:stuff">
            <li>
                <a href="#" data-bind="text:'Item :' + $data.id, click:$parent.setCurrentThing"></a>
            </li>
        </ul>