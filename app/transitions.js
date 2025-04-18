/* eslint-disable prettier/prettier */
export default function () {
    this.transition(
      this.fromRoute('index'),
      this.toRoute('student'),
      this.use('toLeft'),
      this.reverse('toRight'),
    );

    this.transition(
      this.fromRoute('student.index'),
      this.toRoute('student.add'),
      this.use('crossFade'),
      this.reverse('crossFade'),
    )

    this.transition(
      this.fromRoute('student.index'),
      this.toRoute('student.add'),
      this.use('crossFade'),
      this.reverse('crossFade'),
    )

    this.transition(
      this.fromRoute('student.index'),
      this.toRoute('student.edit'),
      this.use('crossFade'),
      this.reverse('crossFade')
    )

    this.transition(
      this.fromRoute('game.index'),
      this.toRoute('game.simen-says'),
      this.use('toUp'),
      this.reverse('toDown')
    )

    this.transition(
      this.fromRoute('game.index'),
      this.toRoute('game.random'),
      this.use('toUp'),
      this.reverse('toDown')
    )
    this.transition(
      this.fromRoute('index'),
      this.toRoute('properties'),
      this.use('fade'),
      this.reverse('fade')
    )
    this.transition(
      this.fromRoute('properties.index'),
      this.toRoute('properties.liquid-fire'),
      this.use('toUp'),
      this.reverse('toDown')
    )

    this.transition(
      this.fromRoute('index'),
      this.toRoute('game'),
      this.use('fade'),
      this.reverse('fade')
    )
    this.transition(
      this.fromRoute('game.index'),
      this.toRoute('game.typing'),
      this.use('toUp'),
      this.reverse('toDown')
    )
    
    this.transition(
      this.childOf('#liquid-bind-demo'),
      this.use('toUp')
    );
  }