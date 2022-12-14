import { Component, OnInit, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const line = document.getElementById('line');
    if(line != null){
      setTimeout(() => {
        //полоса прокрутки
        let windowHeight = window.innerHeight //высота окна браузера
        let Height  = document.documentElement.scrollHeight-windowHeight //высота всей страницы
        setInterval(() => {
          let HeightTop  = document.documentElement.scrollTop //высота, на которую проскролили

          let widthLine = HeightTop / Height * 100 //ширина полосы прокрутки
          line.style.cssText = `
				Width:${widthLine}%;
			`

        }, 1);
      }, 1.5);
    }

  }
  ngAfterContentInit(): void{

    function cursorNone(){
      document.querySelectorAll('body *:not(script)').forEach(element => element.classList.add("cursorNone"));
    }

    function cursorLink() {
      return document.querySelectorAll('a, button, .cursorLink')
    }

    cursor();
    function cursor(){
      cursorNone()
      const cursor = document.getElementById('_cursor');
      const follower = document.getElementById('_follower');
      let posX = 0, posY = 0, mouseX = 0, mouseY = 0;
      let followerSpead =0,cursorMargin=0,clickDuration=1000;

      console.log(cursor)
      if(cursor != null && follower != null){
        let followerValue = follower.getAttribute('cursor-animation-property')
        if(followerValue){
          const _followerValue = followerValue.split(',')
          followerSpead = parseInt(_followerValue[0])
          cursorMargin = parseInt(_followerValue[1])
          clickDuration = parseInt(_followerValue[2])
          console.log(_followerValue[0])
        }
        //-------------------
        setInterval(() => {
          posX += (mouseX - posX) / followerSpead
          posY += (mouseY - posY) / followerSpead
          cursor.style.cssText = `top: ${mouseY}px; left: ${mouseX}px`
          follower.style.cssText = `top: ${posY - cursorMargin}px; left: ${posX - cursorMargin}px`
        }, 0.01);
        //-------------------
        document.addEventListener('click', () => {
          if(!follower.classList.contains('_press')){
            follower.classList.add('_press')
            cursor.classList.add('_press')
            setTimeout(() => {
              follower.classList.remove('_press')
              cursor.classList.remove('_press')
            }, clickDuration);
          }
        })
        window.addEventListener('mousemove', e =>{
          mouseX = e.clientX
          mouseY = e.clientY
        })

        let allLink = cursorLink()
        allLink.forEach(element => {
          element.addEventListener('mouseenter', () => {
            cursor.classList.add('_active')
            follower.classList.add('_active')
          })
          element.addEventListener('mouseleave', () => {
            cursor.classList.remove('_active')
            follower.classList.remove('_active')
          })
        });
      }

    }

    headerbg()
    function headerbg(){
      //цвет хедера
      const header =  document.getElementById('header');
      if(header != null){
        const callback = function(entries: any,observer: any) {
          if(entries[0].isIntersecting){
            header.classList.remove('_scroll');
          }else{
            header.classList.add('_scroll');
          }
        }
        const headerObs = new IntersectionObserver(callback);
        headerObs.observe(header)
        //цвет хедера
      }
    }
  }
}
