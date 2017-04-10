(function () {
    window.addEventListener('DOMContentLoaded', function () {


        function countChild(element) {
            var i = 0;
            while ((element = element.previousElementSibling) != null)++i;
            return i;
        }

        //scrollToNavItemAndDetectCurrentItem
        (function () {
            addClickScrollHref('homeHref');
            addClickScrollHref('serviceHref');
            addClickScrollHref('portfolioHref');
            addClickScrollHref('aboutHref');
            addClickScrollHref('clientHref');
            addClickScrollHref('contactHref');

            addClickScrollHref('upHref');
            addClickScrollHref('likeContactHref');

            function addClickScrollHref(hrefElement) {
                var element = document.getElementById(hrefElement);
                element.addEventListener('click', function (event) {
                    event.preventDefault();
                    var attribute = event.target.getAttribute('href');
                    event.target.onblur;
                    if (!attribute)
                        attribute = event.target.parentElement.getAttribute('href');
                    smoothScroll(attribute.slice(1));
                });
            }
            function smoothScroll(selector) {

                var destElement = document.getElementsByName(selector)[0];
                var currentPos = window.pageYOffset;
                var dest = destElement.offsetTop;

                var distance = Math.abs(dest - currentPos);
                if (distance < 100)
                    window.scrollTo(0, dest);

                var speed = Math.round(distance / 100);
                if (speed > 20)
                    speed = 20;

                var step = distance / 100;
                var timer = 0;
                if (dest > currentPos) {

                    for (var i = currentPos; i <= dest; i += step) {
                        if (i + step < dest) {
                            setTimeout(
                                "window.scrollTo(0, " + i + ")"
                            , speed * timer);
                        }
                        else {
                            setTimeout("window.scrollTo(0, " + dest + ")", speed * timer);
                            return;
                        }
                        timer++;
                    }
                }
                for (var i = currentPos; i >= dest; i -= step) {
                    if (i - step > dest) {
                        setTimeout(
                            "window.scrollTo(0, " + i + ")"
                        , speed * timer);
                    }
                    else {
                        setTimeout("window.scrollTo(0, " + dest + ")", speed * timer);
                        return;
                    }
                    timer++;
                }



            }

            function changeStateOfActiveNav() {
                var currentPageOffset = document.body.scrollTop || document.documentElement.scrollTop;

                currentPageOffset += 10;

                var linkOffsetHome = document.getElementsByName('homeLink')[0].offsetTop;
                var linkOffsetServices = document.getElementsByName('serviceLink')[0].offsetTop;
                var linkOffsetPortfolio = document.getElementsByName('portfolioLink')[0].offsetTop;
                var linkOffsetAbout = document.getElementsByName('aboutLink')[0].offsetTop;
                var linkOffsetClient = document.getElementsByName('clientLink')[0].offsetTop;
                var linkOffsetContacts = document.getElementsByName('contactLink')[0].offsetTop;

                if (currentPageOffset > linkOffsetHome && currentPageOffset < linkOffsetServices) {
                    homeHref.classList.add('active_li');
                } else {
                    homeHref.classList.remove('active_li');
                }
                if (currentPageOffset > linkOffsetServices && currentPageOffset < linkOffsetPortfolio) {
                    serviceHref.classList.add('active_li');
                }
                else {
                    serviceHref.classList.remove('active_li');
                }
                if (currentPageOffset > linkOffsetPortfolio && currentPageOffset < linkOffsetAbout) {
                    portfolioHref.classList.add('active_li');
                } else {
                    portfolioHref.classList.remove('active_li');
                }
                if (currentPageOffset > linkOffsetAbout && currentPageOffset < linkOffsetClient) {
                    aboutHref.classList.add('active_li');
                } else {
                    aboutHref.classList.remove('active_li');
                }
                if (currentPageOffset > linkOffsetClient && currentPageOffset < linkOffsetContacts) {
                    clientHref.classList.add('active_li');
                }
                else {
                    clientHref.classList.remove('active_li');
                }
                if (currentPageOffset > linkOffsetContacts) {
                    contactHref.classList.add('active_li');
                } else {
                    contactHref.classList.remove('active_li');
                }
            }
            window.addEventListener('scroll', changeStateOfActiveNav);


        })();


        //sliderComments
        (function () {
            function Comments() {
                this.active = 0;
                this.controls = document.querySelector('.controls').children;
                this.comments_text = document.querySelector('.comments_text').children;
                //this.amount = 
                var comments = this;
                for (var element in comments.controls) {
                    comments.controls[element].onclick = function (event) {
                        if (event.target.classList.contains('active_control_item')) {
                            return;
                        }
                        else {


                            comments.comments_text[comments.active].classList.remove('visible_block');

                            comments.controls[comments.active].classList.remove('active_control_item');

                            event.target.classList.add('active_control_item');
                            comments.active = countChild(event.target);

                            var current_active_text = comments.comments_text[comments.active];
                            current_active_text.classList.add('visible_block')

                            current_active_text.style.opacity = 0;

                            var opacity = 0;
                            var interval = setInterval(function () {
                                opacity += 0.01;
                                current_active_text.style.opacity = opacity;
                                if (opacity >= 1) {
                                    clearInterval(interval);
                                }
                            }, 30);
                        }

                    }
                }
            }
            var comment = new Comments();
        })();

        //scale2xIcon
        (function () {
            function changeSizeIconWrapper(targetElement, coef) {
             

                var delta = coef - 1;
                var step = delta / 60;
                var incValue = 1 + step;
              

                var icon = targetElement.firstElementChild;
                var fontSizeStart = window.getComputedStyle(icon).fontSize.slice(0, -2);
                var paddingFirst = window.getComputedStyle(targetElement).paddingTop.slice(0, -2);

                var interval = setInterval(function () {
                    incValue += step;
                    icon.style.fontSize = fontSizeStart * incValue + 'px';
                    targetElement.style.paddingTop = paddingFirst * 1/incValue + 'px';
                   
                    if (delta > 0 && incValue >= coef)
                        clearInterval(interval);
                    if (delta < 0 && incValue <= coef)
                        clearInterval(interval);
                }, 4);
            }
            function scale2X(className) {
                var logoCircles = document.getElementsByClassName(className);
                for (var i = 0; i < logoCircles.length; i++) {
                    logoCircles[i].onmouseenter = function (e) {
                        if (e.target.classList.contains('logo_circle'))
                            e.target.classList.add('active_item');
                        changeSizeIconWrapper(e.target, 1.1);
                    }
                    logoCircles[i].onmouseleave = function (e) {
                        if (e.target.classList.contains('logo_circle'))
                            e.target.classList.remove('active_item');
                        changeSizeIconWrapper(e.target, 1 / 1.1);
                    }

                }
            }
            scale2X('logo_circle');
            scale2X('process_icons');
        })();

        //mainSlider
        (function () {
            var slider = {
                current: 0,
                stopSliderTimeOut: null,
                imgs: ["backgroundImage.jpg", "backgroundImage.jpg", "backgroundImage3.jpg"],
                arrows: document.getElementsByClassName('header_slider_arrow'),
                imgsTextWrapper: document.getElementsByClassName('slider_main_item'),
                duration: 3,
                element: document.getElementsByTagName('header')[0],
                removeCurrent: function () {
                    this.imgsTextWrapper[this.current].classList.remove('slider_main_item_active');
                },
                setImageCurrent: function () {
                    this.element.style.backgroundImage = "url(img/" + this.imgs[this.current] + ")";
                    this.imgsTextWrapper[this.current].classList.add('slider_main_item_active');
                    var el = this.imgsTextWrapper[this.current].firstElementChild;


                },
                run: function () {
                    var sliderRef = this;
                    this.interval = setInterval(function () {
                        sliderRef.removeCurrent();
                        sliderRef.current = sliderRef.current >= (sliderRef.imgs.length - 1) ? 0 : sliderRef.current + 1;
                        sliderRef.setImageCurrent();
                    }, sliderRef.duration * 1000);
                },
                start: function () {
                    var sliderRef = this;
                    this.arrows[1].addEventListener('click', function () {
                        clearInterval(sliderRef.stopSliderTimeOut);
                        clearInterval(sliderRef.interval);
                        sliderRef.removeCurrent();
                        sliderRef.current = sliderRef.current >= (sliderRef.imgs.length - 1) ? 0 : sliderRef.current + 1;
                        sliderRef.setImageCurrent();
                        sliderRef.stopSliderTimeOut = setTimeout(function () {
                            sliderRef.run();
                        }, 5000);
                    });
                    this.arrows[0].addEventListener('click', function () {
                        clearInterval(sliderRef.stopSliderTimeOut);
                        clearInterval(sliderRef.interval);
                        sliderRef.removeCurrent();
                        sliderRef.current = sliderRef.current <= 0 ? sliderRef.imgs.length - 1 : sliderRef.current - 1;
                        sliderRef.setImageCurrent();
                        sliderRef.stopSliderTimeOut = setTimeout(function () {
                            sliderRef.run();
                        }, 5000);
                    });
                    this.run();
                }
            };

            slider.start();
        })();


        //validateForm
        (function () {
            function checkForm() {
                var inputs = document.getElementsByClassName('message_input_item');
                for (var i = 0; i < inputs.length; i++) {
                    inputs[i].onkeypress = function (event) {
                        var pattern = new RegExp(event.target.dataset.pattern);

                        if (!pattern.test(event.target.value + String.fromCharCode(event.charCode))) {

                            if (event.target.parentElement.lastElementChild.tagName != 'P') {
                                event.target.classList.add('error_input');
                                var messageError = document.createElement('p');
                                messageError.innerText = 'Error of input';
                                messageError.classList.add('messageError');
                                event.target.parentElement.appendChild(messageError);
                            }

                        }
                        else {
                            if (event.target.classList.contains(('error_input')))
                                event.target.classList.remove('error_input');
                            if (event.target.parentElement.lastElementChild.tagName == 'P')
                                event.target.parentNode.removeChild(event.target.parentElement.lastElementChild);
                        }

                    }
                }
                var submitButton = document.getElementsByClassName('send_message_btn')[0];
                submitButton.addEventListener('click', function (event) {
                    var inputs = document.getElementsByClassName('message_input_item');
                    for (var i = 0; i < inputs.length; i++) {
                        if (inputs[i].classList.contains('error_input')) {
                            event.preventDefault();
                            alert('Check your  fields!');
                        }
                    }
                });
            }
            checkForm();
        })();


        //IncrementProudNumbers
        (function () {
            function runIncrementor(item) {
                var value = +item.innerText;

                var time = 3000
                var step = value / 100;

                var currentSpeed = 31;
                var currentTime = currentSpeed;
                var currentValue = 0;

                var interval = setInterval(function () {
                    setTimeout(function () {
                        currentValue += step;
                        currentTime += currentSpeed;
                        item.innerText = Math.floor(currentValue);

                        if (currentTime + currentSpeed >= time) {
                            item.innerText = value;
                            clearInterval(interval);
                        }


                    }, currentSpeed);


                }, 30);
            }
            function numberElement() {
                var elements = document.getElementsByClassName('number_value');
                for (var i = 0; i < elements.length; i++) {
                    runIncrementor(elements[i]);
                }
            }
            var windowScroll = window.addEventListener('scroll', scrollHandler);
            function scrollHandler(e) {

                var element = document.querySelector('.proud_numbers');
                var positionProudNumbers = document.querySelector('.proud_numbers').offsetTop;
                positionProudNumbers -= element.offsetHeight;
                if (document.body.scrollTop >= positionProudNumbers
               || document.documentElement.scrollTop >= positionProudNumbers) {
                    //alert('noram');
                    this.removeEventListener('scroll', scrollHandler);
                    numberElement();

                }
            }
        })();

        //filterPortfolio
        (function () {
            var portfolio = {
                numberOfActive: 0,
                photowrapper: document.getElementsByClassName('photo_works')[0],
                hoverInit: function () {

                    var children = this.photowrapper.children;
                    for (var i = 0; i < children.length; i++) {
                        children[i].onmouseover = function (e) {
                            var element = e.target.parentElement;
                            if (e.target.tagName != 'P')
                                if (element.lastElementChild.tagName != 'DIV') {
                                    var text = element.dataset.desc;
                                    var subText = element.dataset.subDesc;
                                    var div = document.createElement('div');
                                    var p = document.createElement('p');
                                    p.innerText = subText;


                                    div.innerText = text;

                                    div.style.width = e.target.offsetWidth + 'px';
                                    div.style.height = e.target.offsetHeight + 'px';
                                    div.style.marginTop = -e.target.offsetHeight + 'px';

                                    div.style.paddingTop = e.target.offsetHeight / 2 - 23 + 'px'

                                    div.style.marginleft = e.target.offsetWidth / 2 + 'px';
                                    div.classList.add('active_work_filter');
                                    element.appendChild(div);
                                    div.appendChild(p);
                                }
                        }
                        children[i].addEventListener('mouseleave', function (e) {
                            if (e.target.classList.contains('photo_item') && e.target.lastElementChild.tagName == 'DIV') {
                                var element = e.target;
                                element.removeChild(element.lastElementChild);
                            }
                        }, false);
                    }
                },
                filter: function (type_of_work) {
                    var children = this.photowrapper.children;
                    for (var i = 0; i < children.length; i++) {
                        if (!children[i].classList.contains(type_of_work)) {
                            children[i].style.display = 'none';
                        } else {
                            children[i].style.display = 'block';
                        }
                    }
                },
                resetActivePanel: function () {
                    var panelControls = document.getElementsByClassName('filter_panel')[0].children;
                    panelControls[this.numberOfActive].classList.remove('active');
                },
                filterWebDesign: function () { this.filter('web_design'); this.numberOfActive = 1; },
                filterGraphicDesign: function () { this.filter('graphic_design'); this.numberOfActive = 2; },
                filterPhotography: function () { this.filter('photography'); this.numberOfActive = 3; },
                filterIllustration: function () { this.filter('illustration'); this.numberOfActive = 4; },
                filerAll: function () { this.filter('photo_item'); this.numberOfActive = 0; }

            };
            var all = document.getElementById('all');
            all.onclick = function (e) {
                portfolio.resetActivePanel();
                portfolio.filerAll();
                e.target.classList.add('active');
            }
            var webDesing = document.getElementById('webDesign');
            webDesing.onclick = function (e) {
                portfolio.resetActivePanel();
                portfolio.filterWebDesign();
                e.target.classList.add('active');
            }
            var graphicDesign = document.getElementById('graphicDesign');
            graphicDesign.onclick = function (e) {
                portfolio.resetActivePanel();
                portfolio.filterGraphicDesign();
                e.target.classList.add('active');
            }
            var photogrpahy = document.getElementById('photography');
            photogrpahy.onclick = function (e) {
                portfolio.resetActivePanel();
                portfolio.filterPhotography();
                e.target.classList.add('active');
            }
            var illustration = document.getElementById('illustration');
            illustration.onclick = function (e) {
                portfolio.resetActivePanel();
                portfolio.filterIllustration();
                e.target.classList.add('active');
            }
            portfolio.hoverInit();
        })();

        //sliderClientsLogos
        (function () {
            function scrollClients() {
                var clientsLogos = document.getElementsByClassName('clients_logo');
                for (var i = 0; i < clientsLogos.length; i++) {
                    clientsLogos[i].onmouseover = function (event) {
                        var string = event.target.src;             
                        event.target.src = string.replace(".", "Y.");
                        console.log(event.target.src);
                    }
                    clientsLogos[i].onmouseout = function (event) {
                        var string = event.target.src;
                        event.target.src = string.replace("Y.", ".");
                        console.log(event.target.src);
                    }
                }

                var sliderWrapper = document.getElementsByClassName('clients_slider_wrapper')[0];
                var outerInterval = setInterval(function () {
                    var elementToMove = sliderWrapper.firstChild;
                    var firstChild = sliderWrapper.removeChild(elementToMove);
                    sliderWrapper.appendChild(elementToMove);
                    clientsLogos[0] = clientsLogos[1];
                    clientsLogos[1] = clientsLogos[2];
                    clientsLogos[2] = clientsLogos[3];
                    clientsLogos[3] = clientsLogos[4];
                }, 2000);
            }
            scrollClients();
        })();

        //showTeam
        (function () {

            function changeTeamMember() {
                var teamMembers = document.getElementsByClassName('team_member');
                var teamMemberNames = document.getElementsByClassName('team_member_name');
                var teamMemberDesc = document.getElementsByClassName('descTeamMemberFull');
                var descBlock = document.getElementsByClassName('team_role')[0];

                var crossButton = document.querySelector('.cross_button');
                crossButton.onclick = function () {
                    var descBlock = document.getElementsByClassName('team_role')[0];
                    descBlock.style.display = 'none';
                }
                for (var i = 0; i < teamMembers.length; i++) {

                    teamMembers[i].addEventListener('click', function (event) {
                        if (descBlock.style.display == 'none') {
                            descBlock.style.display = 'block';
                        }
                        var current = countChild(event.currentTarget.parentElement);


                        var dataValuesArray = event.currentTarget.dataset.skills.split(" ");
                        drawCircleElementsTeam(dataValuesArray,current);


                        if (!teamMemberNames[current].classList.contains('active_member_name')) {
                           
                            teamMemberNames[changeTeamMember.active].classList.remove('active_member_name');
                            teamMemberNames[current].classList.add('active_member_name');
                        }
                        if (!teamMemberDesc[current].classList.contains('active_member_desc')) {
                            teamMemberDesc[changeTeamMember.active].classList.remove('active_member_desc');
                            teamMemberDesc[current].classList.add('active_member_desc');
                        }
                        changeTeamMember.active = current;
                    }, false);
                }
            }
            changeTeamMember.active = 0;
            changeTeamMember();


            var skillCircles = document.querySelectorAll('.skill_circle');
            function drawCanvasCircles(canvasNumber, data,i) {
                function drawArc(canvas, data, grad,i) {
                    var targetValue = data / 200 * 2 * Math.PI;
                    var ctx = canvas.getContext("2d");
                    var x = canvas.width / 2;
                    var y = canvas.height / 2;
                    var radius = 65;

                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    ctx.strokeStyle = "#ffe600";
                    ctx.beginPath();

                    if (skillCircles[i].dataset.end == 1) {
                        ctx.clearRect(0, 0, canvas.width, canvas.height);
                        ctx.arc(x, y, radius, 0, 2*Math.PI*data/100);
                    } else {
                        ctx.arc(x, y, radius, 0, grad);
                    }
                 
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    ctx.closePath();
                    ctx.fillStyle = "#ffe600";

                    var font = 30 + "px Oswald_light";
                    ctx.font = font;
                    ctx.textBaseline = "top";
                    var coordXFont = canvas.width / 2 - 22;
                    var coordYFont = canvas.height / 2 - 20;
                   

                    if (skillCircles[i].dataset.end == 1) {
                        ctx.fillText(Math.round(data) + "%", coordXFont, coordYFont);
                        clearInterval(interval);
                    } else {
                        ctx.fillText(Math.round(grad * 100 / (2 * Math.PI)) + "%", coordXFont, coordYFont);
                    }

                    if (grad >= 2 * targetValue) {      
                        clearInterval(interval);
                        skillCircles[i].dataset.end = 1;
                    }
                 
                        
                }
                var grad = 0;
                //var canvas = skillCircles[canvasNumber];
                //var ctx = canvas.getContext("2d");
                //ctx.clearRect(0, 0, canvas.width, canvas.height);
                var interval = setInterval(function () {
                    var canvas = skillCircles[canvasNumber];
                    var step = Math.PI / 200;
                    grad += step;
                    drawArc(canvas, data, grad, i);
                }, 5);
            }

            function drawCircleElementsTeam() {

                drawCanvasCircles(0, +arguments[0][0], arguments[1]);
                drawCanvasCircles(1, +arguments[0][1], arguments[1]);
                drawCanvasCircles(2, +arguments[0][2], arguments[1]);
                drawCanvasCircles(3, +arguments[0][3], arguments[1]);
            }

            var windowScroll = window.addEventListener('scroll', scrollHandlerInitCircles);
            function scrollHandlerInitCircles() {

                var positionProudNumbers = document.querySelector('.skills').offsetTop;
                positionProudNumbers -= document.querySelector('.skills').offsetHeight;
                if (document.body.scrollTop >= positionProudNumbers
               || document.documentElement.scrollTop >= positionProudNumbers) {
                    this.removeEventListener('scroll', scrollHandlerInitCircles);
                    var dataValuesArray = document.getElementsByClassName('team_member')[0].dataset.skills.split(" ");
                    drawCircleElementsTeam(dataValuesArray,0);

                }


            }
        })();
    });
})();