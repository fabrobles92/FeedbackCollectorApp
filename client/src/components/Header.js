import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
class Header extends Component{
    renderContent() {
        switch (this.props.auth) {
            case null:
                return
            case false:
               return <li><a href="/auth/google">Loggin With Google</a></li>
            default:
                return <li><a href="/api/logout">Log out</a></li>
        }
    }
    render() {
        console.log(this.props)
        return(
            <nav>
                <div class="nav-wrapper">
                    <Link to={this.props.auth ? '/surveys' : '/' } class="brand-logo">Emaily</Link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                    {this.renderContent()}
                    </ul>
                </div>
          </nav>
        );
    }
}

//{auth} abajo es state.auth el state esta implicito
function mapStateToProps({auth}) {
    return {auth}
};

export default connect(mapStateToProps)(Header);