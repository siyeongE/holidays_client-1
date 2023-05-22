import { yupResolver } from "@hookform/resolvers/yup";
import * as S from "./login.style";
import { useRouter } from "next/router";
import { UseMutationLogin } from "../../commons/hooks/useMutations/login/useMutationLogin";
import { useForm } from "react-hook-form";
import { LoginSchema } from "./login.validation";

export default function LogIn(): JSX.Element {
  const router = useRouter();
  const { SubmitLogin } = UseMutationLogin();

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(LoginSchema),
    mode: "onSubmit",
  });

  const onSubmitForm = async (data: any) => {
    void SubmitLogin(data);
  };

  const onClickFindID = () => {
    alert("현재 아이디 찾기 서비스는 일시적으로 제한되었습니다.");
    // router.push(`/login/findIdPage`);
  };

  const onClickFindPassword = () => {
    router.push(`/loginPage/findPasswordPage`);
  };

  const onClickSignUp = () => {
    router.push(`/signUpPage`);
  };

  return (
    <>
      <S.Wrapper>
        <S.ContentWrapper>
          <S.HeaderTitle>로그인</S.HeaderTitle>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            <S.InputWrapper>
              <S.Label>아이디</S.Label>
              <S.defaultInput
                placeholder="이메일을 입력해 주세요"
                type="text"
                {...register("email")}
              />
            </S.InputWrapper>
            <div>{formState.errors.email?.message}</div>
            <S.InputWrapper>
              <S.Label>비밀번호</S.Label>
              <S.defaultInput
                placeholder="비밀번호를 입력해 주세요"
                type="password"
                {...register("pwd")}
              />
            </S.InputWrapper>
            <div>{formState.errors.pwd?.message}</div>
            <S.ButtonWrapper>
              <S.LoginButton type="submit">로그인</S.LoginButton>
            </S.ButtonWrapper>
          </form>
          <S.SubtitleWrapper>
            <S.Subtitle onClick={onClickFindID}>아이디 찾기</S.Subtitle>
            <S.Subtitle onClick={onClickFindPassword}>비밀번호 찾기</S.Subtitle>
            <S.Subtitle onClick={onClickSignUp}>회원가입</S.Subtitle>
          </S.SubtitleWrapper>
          <S.SocialWrapper>
            <S.SocialNaverWrapper>
              <S.SocialLoginImage src="/loginPage/naver.png" />
              <S.SocialLogin href="https://happyholidays-server.site/login/naver">
                네이버 계정으로 로그인
              </S.SocialLogin>
            </S.SocialNaverWrapper>
            <S.SocialKakaoWrapper>
              <S.SocialLoginImage src="/loginPage/kakao.png" />
              <S.SocialLogin href="https://happyholidays-server.site/login/kakao">
                카카오 계정으로 로그인
              </S.SocialLogin>
            </S.SocialKakaoWrapper>
            <S.SocialGoogleWrapper>
              <S.SocialLoginImage src="/loginPage/google.png" />
              <S.SocialLogin href="https://happyholidays-server.site/login/google">
                구글 계정으로 로그인{" "}
              </S.SocialLogin>
            </S.SocialGoogleWrapper>
          </S.SocialWrapper>
        </S.ContentWrapper>
      </S.Wrapper>
    </>
  );
}