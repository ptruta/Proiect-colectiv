const days = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY']

function dates(current) {
    let week= new Array(); 
    // Starting Monday not Sunday
    current.setDate((current.getDate() - current.getDay() +1));
    for (let i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() +1);
    }
    return week; 
}


export function getDate(day, time){
  const week = dates(new Date());
  const dayIndex = days.indexOf(day);
  const dayDate = week[dayIndex]
  const dayObject = new Date(dayDate.getFullYear(), dayDate.getMonth(), dayDate.getDate(), parseInt(time), 0);
  return dayObject;
}

export function getDateInFormat(date){
    
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = date.getFullYear();

    let today =  yyyy + '-' + mm + '-' + dd;
    return today;
}

export  function getTodayInFormat(){
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();

    today =  yyyy + '-' + mm + '-' + dd;
    return today;
}

