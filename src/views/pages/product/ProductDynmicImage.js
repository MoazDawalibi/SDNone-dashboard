import { useAddAdditionalImage, useDeleteAdditionalImage, useUpdateAdditionalImage } from 'api/ProductAdditionalImage'
import { baseURL, baseURLImage } from 'api/config'
import { useAddserviceIMages, useDeleteserviceIMages, useUpdateserviceIMages } from 'api/service'
import SpinnerComponent from 'components/@vuexy/spinner/Fallback-spinner'
import ImagePreview from 'components/ImagePreview'

import { LoadingButton, ValidatedField } from 'components/input'
import { useFormikContext } from 'formik'
import { useImagePreview } from 'hooks'
import React from 'react'
import { Row , Col} from 'reactstrap'
import { useTranslation } from 'utility/language'

const MAX_IMAGE_COUNT = 4
function DynmicImageProduct({images=[] , object_Id=1, isFetching , Loading }) {

  const formik = useFormikContext()
  const t  = useTranslation()

  const {mutate:add } = useAddAdditionalImage();

  const {mutate:update } = useUpdateAdditionalImage()
  const {mutate , isLoading } = useDeleteAdditionalImage()
  let images_length = images.length

  let handleImage =[]


  for(let i = 1; i <= MAX_IMAGE_COUNT; i++){

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {handleImageChange ,preview} = useImagePreview(images[i-1]?.path ? baseURLImage + images[i-1]?.path + '?'+performance.now(): null)


      handleImage.push({
        h:handleImageChange,
        p:preview,
      })
      
  }


  let a = createArrayWithNElemnt(MAX_IMAGE_COUNT)
  
  const update_image = (image , id )=>{
        const formData = new FormData()
        formData.append('new_image' , image)
        formData.append('image_id' ,id)
        update(formData)
  }
  const add_image = (image )=>{

    const formData = new FormData()
    formData.append('additional_image' , image)
    formData.append('product_id' ,object_Id)
    add(formData)
  }

  const deleteImage = (id, index )=>{
    console.log(id);
    mutate({
      image_id :id
    })
    // console.log(handleImage[index]);
    handleImage[index-1].p = null
  }
 
  return (
    <Row  md={3}>
      {
        a.map(i => (
          images_length >=i-1 &&(
            <Col key={i}>
            <ValidatedField
        id={"image" +i}
        type="file"
        label={t("file") + i}
        name={"image1" +i}
        accept="image/*,video/*"
        onChange={(e) => {
          handleImage[i-1].h(e)

          if(images_length >=i){
              update_image(e.target.files[0] , images[i-1]?.id)
          }else{
            add_image(e.target.files[0])
          }
        }}
      />
     
      {/* <FIlePreview preview={handleImage[i-1].p} /> */}
      <ImagePreview preview={handleImage[i-1].p} />
      {
        images_length >=i &&  
        <LoadingButton onClick={()=>deleteImage(images[i-1].id , i-1 )} style={{
          margin:10
        }}
         isLoading={isLoading}>
        delete
      </LoadingButton>
      }
        </Col>
          )
         
        ))
      }
    </Row>
  )
}

export default DynmicImageProduct

export const createArrayWithNElemnt=(n)=>{

  let new_array = []

  for(let i =1 ; i<= n ; i++){
    new_array.push(i)
  }

  return new_array
}