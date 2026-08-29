export async function hackerNewsApi() {
  try {
    const response = await fetch(
      "https://hacker-news.firebaseio.com/v0/jobstories.json",
    );
    if(!response.ok){
      throw new Error(`Failed to fetch job Ids. Status: ${response.status} (${response.statusText})`)
    }
    const jobsIds = await response.json(); //array of jobs Ids
    const jobsDetails = await Promise.all( //allow parallel fetching of multiple requests and resolve only when all request are done
      jobsIds.map(async (id)=>{
        const response = await fetch(
          `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
        );
        if(!response.ok){
          throw new Error(`Failed to load job with ${id}. Status:${response.status} (${response.statusText})`)
        }
        return response.json();
      }),
    );
    return jobsDetails;
  } catch (e) {
    console.error("Error: ", e);
    throw e;
  }
}