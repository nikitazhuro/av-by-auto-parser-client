export const transformListOfCarsForAllYearsFromGen = (listOfTheSameGenCars: any[]) => {
  const lastElem = listOfTheSameGenCars[listOfTheSameGenCars.length - 1];

  const resultObj = {
    brand: lastElem.brandId,
    generation: lastElem.generationId,
    model: lastElem.modelId,
    data: lastElem.data,
  }

  const data: any[] = listOfTheSameGenCars.map((e) => {
    const dataExample = {
      title: e.data.title,
      year: e.data.lastSoldAdverts[0]?.year,
      lastSoldCars: e.data.lastSoldAdverts,
      mediumPrice: e.data.mediumPrice,
    }

    return dataExample;
  })

  resultObj.data = data;

  return resultObj;
}