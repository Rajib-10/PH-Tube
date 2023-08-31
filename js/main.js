const handleCategory = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/videos/categories"
  );
  const data = await res.json();
  const allCategories = data.data;

  const cardBox = document.getElementById("button-box");
  allCategories.forEach((categories) => {
    const div = document.createElement("div");
    div.innerHTML = `
        
        <button onclick="handleLoadCategories('${categories.category_id}')" class="btn mr-4 capitalize">${categories.category}</button>
         `;
    cardBox.appendChild(div);
  });
};

const handleLoadCategories = async (id,isSort) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/videos/category/${id}`
  );
  const data = await response.json();

  const cardContainer = document.getElementById("card-container");
  cardContainer.textContent = "";
  const emptyItem = document.getElementById("empty-item");
  const categories = data.data;

    if(categories.length==0){
        emptyItem.classList.remove("hidden");
    }else{
        emptyItem.classList.add("hidden");
    }
    
    // if(isSort){
    //     categories.sort((a, b) => parseFloat(b.others.views)*1000 - parseFloat(a.others.views)*1000);
    //     console.log("button is clicked");
    // }
    // categories.sort((a, b) => parseFloat(b.others.views)*1000 - parseFloat(a.others.views)*1000);

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card  bg-base-100 shadow-xl">
        <figure class="h-[130px]">
            <img src="${category?.thumbnail}" alt="">
            <p class="bg-gray-700 text-white absolute p-1 rounded-md text-[10px] right-[1%] top-[39%]" >${category?.others?.posted_date ?
                `${Math.floor(category.others.posted_date / 3600)} hr ${Math.floor((category.others.posted_date % 3600) / 60)} min ago` :
                ""}</p>
            
        </figure>
        <div class="card-body -ml-[30px]">

            <div class="flex gap-2  ">
                <div class="avatar ">
                    <div class="w-14 h-14 rounded-full">
                        <img  src="${
                          category?.authors[0]?.profile_picture
                        }" alt="">
                    </div>
                </div>
                <div>
                    <h2 class="card-title">${category?.title.slice(0, 14)}</h2>
                    <div class="flex gap-3">
                        <h2>${category?.authors[0]?.profile_name} <span>${category?.authors[0]?.verified ? `<i class="fa-solid fa-circle-check ml-2"></i>` : ""}</span>
                        </h2> 
                    </div>
                    <h2>${category?.others?.views} <span>views</span> </h2>
                </div>
                
            </div>  
            
        </div>
    </div>
        `;

    cardContainer.appendChild(div);
  });
};

handleCategory();

//  blog button handle here 
function blogHandler(){
    window.open("blog.html", "_blank");
}


// sort button handler 

function sortHandler(){

    handleLoadCategories(true)
}

handleLoadCategories("1000");