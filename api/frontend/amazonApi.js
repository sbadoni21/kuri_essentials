
const getProductData = async () => {
    try {
      //   const PartnerTag = "selfcarebysha-21"; 
      //   console.log("called")
      // const response = await axios.post(`http://localhost:5000/paapi5/searchitems?Keywords=sofa&SearchIndex=Electronics&ItemCount=10&PartnerTag=${PartnerTag}&PartnerType=Associates`);
      // if (!response.ok) {
      //   throw new Error('Failed to fetch product data');
      // }
      // const data = await response.json();
      // return data;
    } catch (error) {
      console.error('Error fetching product data:', error);
      return null;
    }
  };
  
  export default getProductData;
  