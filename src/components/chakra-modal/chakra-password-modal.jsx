import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    Button,
    Text,
  } from "@chakra-ui/react";

  /**
   * title: Title for the modal
   * cancelButtonText: Button text for the button that closes the modal and does not do anything else
   * approveButtonText: Button text for approving the action the modal is there to buffer for, i.e. saving changes or deleting a post
   * approveCallback: callback func for when the user clicks the approve button, i.e. whatever task you are making sure the user wants to do
   * isModalOpen: a boolean (probably held in a state variable) denoting if the modal should be open or not
   * closeModalFunc: the function that closes the modal (probably by setting the state variable boolean to false) 
   */
  const ChakraPasswordModal = ({title, cancelButtonText, approveButtonText, approveCallback, isModalOpen, closeModalFunc}) => {
    // const modalDisclosure = useDisclosure();
    return (
        <Modal isOpen={isModalOpen} onClose={closeModalFunc} >
            <ModalOverlay />
            <ModalContent bg="rgba(0,0,0,0)" boxShadow="none" >
            <ModalHeader></ModalHeader>
            <ModalBody display="flex" justifyContent="center" >
                <Text fontSize="3xl" color="white" fontWeight="600" >
                {title}
                </Text>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="center" columnGap="2.5rem">
                <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={closeModalFunc}>
                {cancelButtonText}
                </Button>
                <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" onClick={approveCallback}>
                {approveButtonText}
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
  }

  export default ChakraPasswordModal;