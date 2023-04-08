import { Button, Modal } from "antd"
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { getBrandsFromAVApi, getGenerationsFromAVApi, getMileageCarsFromAVApi, getModelsFromAVApi } from "../../../../api/mileageCardApi";

const SaveAllCars = () => {
  const save = async () => {
    const resultDataToSave = [];
    const brands = await getBrandsFromAVApi();

    for (let i = 7; i < 11; i++) {
      const brandId = brands[i].id;
      const models = await getModelsFromAVApi(brandId)

      for (let j = 0; j < models.length; j++) {
        const modelId = models[j].id;
        const generations = await getGenerationsFromAVApi(brandId, modelId)

        for (let k = 0; k < generations.length; k++) {
          const {
            id: generationId,
            yearFrom,
            yearTo,
          } = generations[k];

          if (yearFrom && yearTo) {
            for (let q = yearFrom; q <= yearTo; q++) {
              const resultData = {
                brandId,
                modelId,
                generationId,
                data: {},
              };
              const mileageCars = await getMileageCarsFromAVApi(brandId, modelId, generationId, q)

              resultData.data = mileageCars;

              resultDataToSave.push(resultData);
            }
          } else if (yearFrom || yearTo) {
            const resultData = {
              brandId,
              modelId,
              generationId,
              data: {},
            };

            const mileageCars = await getMileageCarsFromAVApi(brandId, modelId, generationId, yearFrom || yearTo)

            resultData.data = mileageCars;

            resultDataToSave.push(resultData);
          }
        }
      }
    }

    console.log(resultDataToSave);
  }

  const confirm = () => {
    Modal.confirm({
      title: 'Warning!',
      centered: true,
      icon: <ExclamationCircleOutlined />,
      content: 'Данный процесс может занять время, вы уверены?',
      okText: 'Save',
      onOk: save,
      cancelText: 'Cancel',
    });
  };

  return (
    <Button
      onClick={confirm}
      type="primary"
    >
      Save all cars data to database
    </Button>
  )
}

export default SaveAllCars;
