import "dotenv/config";

const MONDAY_QUERY = `
    query{
  boards(ids:18396816803) {
    items_page{
      items{
        id
        name
        column_values{
          id
          text
        }
      }
    }
  }
}
`;

// make API request

export const fetchFromMondayAPI = async()=>{
    if (!process.env.MONDAY_TOKEN){
        throw new Error (
            "Missing MONDAY_TOKEN! Add it to your .env file"
        )

    }
    const response = await fetch("https://api.monday.com/v2",{
        method:"POST",
        headers: {
            "content-type":"application/json",
            Authorization: process.env.MONDAY_TOKEN,
        },
        body: JSON.stringify({ query: MONDAY_QUERY }),
    });

    const data = await response.json();
    return data;
} 

fetchFromMondayAPI()
.then((data) => {
    console.log("Yay! I Fetched the data from monday.com!");

    console.log(JSON.stringify(data, null, 2));
}).catch((err) => {
    console.error("Aw shucks! Failed to fetch data from monday.com :(:");
    console.error("Reason", err.message);

    process.exit(1);
});


