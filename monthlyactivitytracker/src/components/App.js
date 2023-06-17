import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: '',
      Activities: [],
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    let arr = this.state.Activities;
    arr.push(this.state.activity);
    this.setState({ Activities: arr });
  };

  handleActivity = ({ target }) => {
    let { name, value } = target;
    this.setState({ [name]: value });
    target.innerText = '';
  };

  handelEvents = (index) => {
    let arr = this.state.Activities;
    arr.splice(arr.indexOf(index), 1);
    this.setState({ Activities: arr });
  };

  componentDidMount(){
    if ( localStorage.Activities ) {
      this.setState( { Activities: JSON.parse(localStorage.Activities)|| [] }  );
    }
    window.addEventListener("beforeunload",this.handleLocalStorage)
  }

  componentWillUnmount(){
    window.removeEventListener("beforeunload",this.handleLocalStorage)
  }

  handleLocalStorage = () => {
    window.localStorage.setItem( "Activities", JSON.stringify(this.state.Activities) )
  }


  render() {
    return (
      <>
        <div className="text-center">
          <h1 className="text-sky-700 text-4xl co mt-9 mb-5 font-bold">
            Monthly Activity Tracker!
          </h1>
          <form onSubmit={this.handleSubmit}>
            <input
              onChange={this.handleActivity}
              className="border py-2 pl-12"
              type="text"
              id="fname"
              name="activity"
              value={this.state.activity}
              placeholder="e.g. coding"
            />
            <input
              className="text-white py-2 px-3 bg-teal-500"
              type="submit"
              value="Add Activity"
            />
          </form>
          <div className="m-20 text-center">
            {this.state.Activities.map((ele, i) => (
              <AcitivityCard
                key={ele}
                name={ele}
                handelEvents={this.handelEvents}
                label={ele}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

class AcitivityCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [],
    };
  }
  handleDate = (date) => {
    if (this.state.selected.includes(date)) {
      this.setState((prevState) => ({
        selected: prevState.selected.filter((d) => d !== date),
      }));
    } else {
      this.setState((prevState) => ({
        selected: prevState.selected.concat(date),
      }));
    }
    console.log(this.state.selected);
  };
  render() {
    let selected = this.state.selected;
    return (
      <div className="border rounded m-2 flex">
        <div className="p-24 m-2 bg-teal-50">
          <h2 className="text-3xl m-1 font-semibold">{this.props.label}</h2>
          <h3 className="bg-red-500 px-2 text-white p-1 rounded text-lg font-semibold">
            {new Date().toLocaleString('en-US', { month: 'long' })}
          </h3>
        </div>
        <div className="p-3 m-2 flex flex-wrap ">
          {Array.from(
            {
              length: Number(
                String(
                  new Date(
                    new Date().getFullYear(),
                    new Date().getMonth() + 2,
                    0
                  )
                ).split(' ')[2]
              ),
            },
            (_, i) => i + 1
          ).map((ele) => (
            <button
              onClick={() => {
                this.handleDate(ele);
              }}
              className={`border h-10 w-20 m-2 ${
                selected.includes(ele) ? 'bg-green-200' : ''
              }`}
            >
              {ele}
            </button>
          ))}
        </div>
        <div>
          <button
            onClick={() => {
              this.props.handelEvents(this.props.name);
            }}
            className=" mt-1 mr-2 text-zinc-100 w-6 h-6 bg-red-600 rounded-xl"
          >
            X
          </button>
        </div>
      </div>
    );
  }
}

export default App;
