import { TweenMax, Elastic } from 'gsap';

export default {
  fadeInClouds(target){
    return TweenMax
      .from(target, 1, {
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      })
  },
  fadeOutClouds(target){
    return TweenMax
      .to(target, 1, {
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      })
  },
  titleTransition(target){
    return TweenMax
      .from(target, 1.5, {
        transform: 'translateY(300px) rotateX(130deg)',
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      })
  },
  inCounter(target){
    console.log('in');
    return TweenMax
      .from(target, 2.5, {
        transform: 'translateY(300px) rotateY(270deg)',
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 5)
      })
  },
  inCitySearch(target){
    console.log('in');
    return TweenMax
      .from(target, 2.5, {
        transform: 'translateY(300px) rotateY(-270deg)',
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 5)
      })
  },
  inCalendar(target){
    console.log('in');
    return TweenMax
      .from(target, 2, {
        transform: 'translateY(300px) rotateX(-270deg)',
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 5)
      })
  },
  inMultiAnimation(target){
    console.log('in');
    return TweenMax
      .staggerFrom(target, 1.5, {
        transform: 'translateX(400px) rotateY(50deg)',
        opacity: 0,
        ease: Elastic.easeOut.config(0.25, 1)
      }, 0.3)
  },

}
