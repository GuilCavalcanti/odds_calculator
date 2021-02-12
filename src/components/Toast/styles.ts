import styled from 'styled-components';
import { Alert, AlertTitle} from '@material-ui/lab'


export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  overflow: hidden;
  padding: 15px 25px;
`;

export const AlertStyled = styled(Alert)`
  width: 100%;
  white-space: nowrap;
  padding: 10px 20px 10px 15px;
  
  font-family: 'Roboto Slab', serif;
`;

export const AlertTitleStyled = styled(AlertTitle)`
  font-family: 'Roboto Slab', serif;
`;
