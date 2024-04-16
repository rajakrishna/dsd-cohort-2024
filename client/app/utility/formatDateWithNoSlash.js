export const formatDateWithNoSlash = (dateString) => {
    console.log("datestring: "+dateString)
    const formattedDate = dateString.split("/")
    let [month, day, year] = formattedDate;
    month = month.padStart(2, 0);
    day = day.padStart(2, 0);
    console.log("formatted Date: " +month + day + year)
    return month + day + year;
}