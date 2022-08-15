console.clear()

//create action creators for our insurance company

//people dropping off a form/creating a policy
const createPolicy = (name, amount) => {
  //return an action
  return {
    type: "CREATE_POLICY",
    payload: {
      name: name,
      amount: amount
    }
  }
}

//people deleting a policy
const deletePolicy = (name) => {
  return {
    type: "DELETE_POLICY",
    payload: {
      name: name
    }
  }
}

//creating a claim
const createClaim = (name, amountToCollect) => {
  return {
    type: "CREATE_CLAIM",
    payload: {
      name: name,
      amountToCollect: amountToCollect
    }
  }
}


//create some Reducers to act as departments - Claims department
const claimsHistory = (oldListOfClaims = [], action) => {
  if (action.type === "CREATE_CLAIM") {
    //we care about this action that has been dispatched
    return [...oldListOfClaims, action.payload]
  } 
  return oldListOfClaims
}




//Create a reducer for the accounting department
const accounting = (bagOfMoney = 1000, action) => {
  if (action.type === "CREATE_CLAIM") {
    return bagOfMoney - action.payload.amountToCollect
  } else if (action.type === "CREATE_POLICY") {
    return bagOfMoney + action.payload.amount
}
  return bagOfMoney
}


//Create a reducer for the Policies Department
const policies = (listOfPolicies = [], action) => {
  if (action.type === "CREATE_POLICY") {
      return [...listOfPolicies, action.payload.name]
  } else if (action.type === "DELETE_POLICY") {
    return listOfPolicies.filter(name => name !== action.payload.name)
  }
  return listOfPolicies
}


//combine reducers

const { createStore, combineReducers } = Redux

const ourDepartments = combineReducers({
    accounting: accounting,
    claimsHistory: claimsHistory,
  policies: policies
  })

//create a store to house all our departments
const store = createStore(ourDepartments)

// create a sample policy and test it
// const action = createPolicy('Debbie', 150)

//test displatching the action and handing it over to the reducers
store.dispatch(createPolicy("Debbie", 1000))
store.dispatch(createPolicy("Bola", 5000))
store.dispatch(createPolicy("Alex", 3000))

store.dispatch(createClaim("Tobi", 2000))

store.dispatch(deletePolicy("Timi"))

console.log(store.getState())
