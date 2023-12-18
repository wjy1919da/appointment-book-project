import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
    Spinner
  } from "@chakra-ui/react";

  /**
   * isModalOpen: a boolean (probably held in a state variable) denoting if the modal should be open or not
   * closeModalFunc: the function that closes the modal (probably by setting the state variable boolean to false) 
   */
  const ChakraLoadingModal = ({isModalOpen, closeModalFunc}) => {
    return (
        // <Modal isOpen={isModalOpen} onClose={closeModalFunc} >  // use this if you want the user to be able to close the modal by clicking
        <Modal isOpen={isModalOpen} >
            <ModalOverlay />
            <ModalContent bg="rgba(0,0,0,0)" boxShadow="none" >
            <ModalHeader></ModalHeader>
            <ModalBody display="flex" flexDirection="column" justifyContent="center" alignItems="center" rowGap="2rem" >
                <Text fontSize="5xl" color="white" fontWeight="600" >
                Loading...
                </Text>
                <Spinner thickness='4px'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='white.600' size='xl' />
            </ModalBody>

            {/* <ModalFooter display="flex" justifyContent="center" columnGap="2.5rem">
                <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={closeModalFunc}>
                {cancelButtonText}
                </Button>
                <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" onClick={approveCallback}>
                {approveButtonText}
                </Button>
            </ModalFooter> */}
            </ModalContent>
        </Modal>
    )
  }

  export default ChakraLoadingModal;