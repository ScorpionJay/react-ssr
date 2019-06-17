/**
 * 动画组件
 */
import React, { Component } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

// export default class Fade extends Component {
// 	render() {
// 		return (
// 			<TransitionGroup  >
// 				<CSSTransition
// 						  appear={true}
// 				          classNames="fade"
// 				          timeout={500}>

// 				         { this.props.children }
// 				</CSSTransition>

// 			</TransitionGroup>
// 		)
// 	}
// }

const Fade = ({ children }) => (
  <div className="fade">
    <TransitionGroup>
      <CSSTransition
        appear={true}
        enter={true}
        classNames="fade"
        timeout={{
          enter: 300,
          exit: 0
        }}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  </div>
);

export default Fade;
