/*

    Version 1.0
    
    Developer: Victor Titov

    Email: victor8titov@yandex.ru

    Description: 
    Данный плагин позволяет выполнять действия с коллекцией объектов. Как только элемент из коллекции 
    попадает в область видимости, можно выполнить несколько действий. А именно.
    *   Вызвать функцию обработчик, указаный при инициализации плагина.
    *   Добавить Css классы к объекту.
    Плагин возвращает объект jQuery что делает возможным продолжать цепочку вызовов.
    
    Link: https://github.com/victor8titov/jquery.animateScroll

*/
(function( $ ){
    $.fn.animateScroll = function( userOptions ) {  
        // Options 
        var o = {
            offset          : 80,  // Смещение от верха и низа. Тогда анимация к объекту будет применена когда он будет уже в зоне видимости а не на границе.
            wHeight         : $(window).height(), // Window Height
            elem            : this, // Все элементы для которых нужно производить анимацию.

            //  для дискретизации события скролла
            delta           : 60, // Величина дескритизации. Т.е величина шага между запусками события. (px)
            prevTop         : $(window).scrollTop(), // Предыдущее положение скролла относительно левого верхнего угла
            buffer          : 0, // Величина накопления движения скролла после предыдущего выполнения события
        }

        if (typeof userOptions === 'function') o.handler = userOptions;
        else if (typeof userOptions === 'object') $.extend(o, userOptions);
        else return this;
       
        function scrollEvent(firstRun) {
            //  При первом запуске нужно отобразить елементы в зоне видимости
            if (firstRun === 'the first run') {                
                o.buffer = o.delta; // Для прохождения условия далее
                o.offset *= -1; // Расширим область срабатывания, чтобы элемент в видимой области гарантированно появился
            } 

            var wTop = $(window).scrollTop(); // Позиция скролла относительно верха видимой области

            /*
            *    ------------------ 
            *    Блок дискретизации            
            */
            // Добовляем или отнимаем из буфера разницу позиций скролла.
            if ( wTop > o.prevTop ) o.buffer += wTop - o.prevTop;
            else if ( wTop < o.prevTop ) o.buffer -= o.prevTop - wTop;            
            
            // Запищем предыдущий шаг.
            o.prevTop = wTop;            

            // Если буффер (o.buffer) переполнен можно запустить основной код на выполнение.
            if ( Math.abs(o.buffer) < o.delta ) return;
            o.buffer = 0;
            /*
            *   Конец блока дискретизации
            *   --------------------------
            */            
            /*
            *      -----------------------
            *      General blok programm
            *      Здесь основной блок для анимации элементов
            */
            wBottom = wTop + o.wHeight;
            // Перебор всех выбранных элементов            
            o.elem.each(function() {           
                var obj = $(this);
                    elemTop = Math.round( obj.offset().top ),
                    elemBottom = elemTop + ( obj.height() );
                
                //  Основная проверка! 
                //  Проверяем попадает ли верхняя граница объекта или нижняя граница объекта в область видимости
                //  область видимости сужается переменной o.offset. Чтобы обеспечить видимость анимации. В противном случае анимация будет происходить на границах области видимости
                if ( ((wBottom - o.offset) > elemTop && elemTop > (wTop + o.offset) ) || ( (wBottom - o.offset) > elemBottom && elemBottom > (wTop + o.offset) ) ) {
                    //  Если уже объект анимирован пропустить его
                    if ( obj.data('animated') ) return;                    
                    /*
                    *   --------------------------------------
                    *   Действия над объектом в зоне видимости
                    */
                    obj.data('animated', 'true');
                    if ( o.handler   ) o.handler.apply( this, arguments );
                    if ( o.classToAdd ) obj.addClass( o.classToAdd );
                    /*
                    *      
                    *   ----------------------------------------
                    */
                };// End if;
            });// End each
            if (firstRun === 'the first run') o.offset *= -1; 
        };// End scrollEvent();    

        //  Регистрируем обработчик событий для скролла
        $(window).bind('scroll.animateScroll', scrollEvent );

        //  Первый запуск, покажем элементы в зоне видимости.        
        scrollEvent('the first run');
        
        // Если изменится размер окна, откорректируем значение высоты
        $(window).resize(function(e){
            o.wHeight = e.currentTarget.innerHeight;            
        });
        
    return this;   
    };// End animateScroll();
})( jQuery );