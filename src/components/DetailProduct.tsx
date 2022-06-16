import Image from 'next/image';
import { useContext, useState } from 'react';
import { AppContext } from 'contexts/AppProvider';
import { SectionFlexProduct } from 'styles/Containers';
import { useMediaQuery } from 'hooks/useMediaQuery';
import StarsAvaliations from './StarsAvaliations';
import {
  BtnContainer,
  BtnGoBack,
  ContainerPainelFloat,
  Description,
  ErrorLoadProduct,
  ImageContainer,
  InfoContainer,
  LinksNavigate,
  ProductComment,
  ProductDetail,
  ProductName,
  ProductPrice
} from 'styles/components/DetailProduct';
import { ArrowBack } from './icons';
import Router from 'next/router';
import { ProductWineBox } from 'contexts/types';

const DetailProduct = () => {
  const { productFocus, saveInCart } = useContext(AppContext);
  const [count, setCount] = useState(1);
  const inMobile = useMediaQuery('(max-width: 900px)');
  const [status, setStatus] = useState('Adicionar');

  const addInWineBox = (product: ProductWineBox) => {
    setStatus('Salvando...');
    saveInCart(product, count)

    setTimeout(() => {
      setStatus('Adicionado ao WineBox!');
    }, 2000);

    setTimeout(() => {
      setStatus('Adicionar');
    }, 4000);
  };

  const increment = () => {
    setCount(count + 1);
  };
  
  const decrement = () => {
    setCount(count - 1);
  };
  
  if (!productFocus) {
    return (
      <>
        <BtnGoBack
          onClick={ () => Router.push('/') }
          data-cy="details_products_page_btn_back"
        >
          <ArrowBack />
          Voltar
        </BtnGoBack>
        <ErrorLoadProduct>
          Erro ao carregar o produto!
        </ErrorLoadProduct>
      </>
    );
  };
  
  const { name, image, id, priceMember, priceNonMember  } = productFocus;

  /* Versão para dispositivos com no máximo 900px de largura */
  if (inMobile) {
    return (
      <SectionFlexProduct>
        <InfoContainer>
          <LinksNavigate>
            <a href="#">Vinhos</a> &gt; <a href="#">{ productFocus.country }</a> &gt; { productFocus.region }
          </LinksNavigate>
          <ProductName>{ productFocus.name }</ProductName>
            <ProductDetail>
              <Image
                src={ productFocus.flag }
                alt="Flag"
                width={ 20 }
                height={ 20 }
              />
              <span>{ productFocus.country }</span>
              <span>{ productFocus.type }</span>
              <span>{ productFocus.classification }</span>
              <span>{ productFocus.volume }</span>
            </ProductDetail>
        </InfoContainer>

        <ImageContainer>
          <Image
            src={ productFocus.image }
            alt="Product"
            width="100%" height="100%" layout="responsive" objectFit="contain"
          />
        </ImageContainer>

        <Description>
          <h4>Descrição</h4>

          <ProductComment>
            { productFocus.sommelierComment }
          </ProductComment>
        </Description>

        <ContainerPainelFloat progress={ status !== 'Adicionar' }>
          <div>
            <span>{ `${productFocus.discount}% OFF` }</span>
            <span>{ `R$ ${productFocus.price.toFixed(2).replace(/\./, ',')}` }</span>
            <span>R$ <span>{
              productFocus.priceMember.toFixed(2).replace(/\./, ',')  
            }</span></span>
            <span>
              { `PREÇO NÃO-SÓCIO R$ ${productFocus.priceNonMember
                  .toFixed(2).replace(/\./, ',')}` }
            </span>
          </div>

          <div>
            <button onClick={ () => addInWineBox({ name, image, id, priceMember, priceNonMember }) }>
              { status }
            </button>
          </div>
        </ContainerPainelFloat>
      </SectionFlexProduct>
    );
  };
  
  /* Versão para dispositivos com no mínimo 900px de largura */
  return (
    <>
      <BtnGoBack
        onClick={ () => Router.push('/') }
        data-cy="details_products_page_btn_back"
      >
        <ArrowBack />
        Voltar
      </BtnGoBack>
      <SectionFlexProduct>
        <ImageContainer>
          <Image
            src={ productFocus.image }
            alt="Product"
            width="100%" height="100%" layout="responsive" objectFit="contain"
          />
        </ImageContainer>
        <InfoContainer>
          <LinksNavigate>
            <a href="">Vinhos</a> &gt; <a href="">{ productFocus.country }</a> &gt; { productFocus.region }
          </LinksNavigate>
          <ProductName data-cy="details_products_name_product">
            { productFocus.name }
          </ProductName>
          <ProductDetail>
            <Image
              src={ productFocus.flag }
              alt="Flag"
              width={ 20 }
              height={ 20 }
            />
            <span>{ productFocus.country }</span>
            <span>{ productFocus.type }</span>
            <span>{ productFocus.classification }</span>
            <span>{ productFocus.volume }</span>
            <StarsAvaliations avaliation={ productFocus.rating } />
            <span>({ productFocus.avaliations || 0 })</span>
          </ProductDetail>
          <ProductPrice>
            { `R$ ${ productFocus.priceMember
              .toFixed(2).replace(/\./, ',') }` }
          </ProductPrice>
          <h3>
            { `NÃO SÓCIO R$ ${ productFocus.priceNonMember
                .toFixed(2).replace(/\./, ',') }/un.` }
          </h3>

          <h4>Comentário do Sommelier</h4>

          <ProductComment>
            { productFocus.sommelierComment }
          </ProductComment>
          <BtnContainer progress={ status !== 'Adicionar' }>
            <div>
              <button
                disabled={ count === 1 ? true : false }
                onClick={ decrement }
              >
                -
              </button>
              <span>{ count }</span>
              <button onClick={ increment }>+</button>
            </div>
            <button
              onClick={ () => addInWineBox(
                { name, image, id, priceMember, priceNonMember }
              )}
            >
              { status }
            </button>
          </BtnContainer>
        </InfoContainer>
      </SectionFlexProduct>
    </>
  );
};

export default DetailProduct;
