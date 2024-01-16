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
  const ChakraUserAppointmentModal = ({title, cancelButtonText, approveButtonText, approveCallback, isModalOpen, closeModalFunc}) => {
    // const modalDisclosure = useDisclosure();
    return (
        <Modal isOpen={isModalOpen} onClose={closeModalFunc} >
            <ModalOverlay bg="rgba(0,0,0,0.83)" />
            <ModalContent bg="rgba(0,0,0,0)" boxShadow="none" left="-3rem" >
            <ModalHeader></ModalHeader>
            <ModalBody display="flex" justifyContent="center" width={[300, 400, 600]}  >
                <Text fontSize="3xl" color="white" fontWeight="600" >
                {title}
                </Text>
            </ModalBody>

            <ModalFooter display="flex" justifyContent="flex-end" columnGap="2.5rem" width={[300, 400, 600]}>
                <Button bgColor="#675D59" px="28px" py="20px" color="white" _hover={{ bg: "#4c4542" }} onClick={approveCallback}>
                {approveButtonText}
                </Button>
                <Button bgGradient="linear(to-r, #F48C8A, #F0A484)" color="white" _hover={{ bgGradient: "linear(to-r, #f27673, #ee9570)" }} px="28px" py="20px" onClick={closeModalFunc}>
                {cancelButtonText}
                </Button>
            </ModalFooter>
            </ModalContent>
        </Modal>
    )
  }

  export default ChakraUserAppointmentModal;