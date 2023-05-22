import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import { useState } from "react";
import { IFormData } from "../../../../units/classPage/write/classWrite.types";

export const CREATE_CLASS = gql`
  mutation createClass($createClassInput: CreateClassInput!) {
    createClass(createClassInput: $createClassInput) {
      class_id
      title
      content_summary
      price
      class_mNum
      address
      address_detail
      category
      address_category
      total_time
      content
      accountNum
      accountName
      bankName
      is_ad
    }
  }
`;

export const UseMutationCreateClass = () => {
  const [createClass] = useMutation(CREATE_CLASS);
  const router = useRouter();

  // 우편주소(카카오지도)
  const [fulladdress, setFulladdress] = useState("");

  // 등록하기 버튼
  const onClickClassSubmit = async (data: IFormData) => {
    console.log("등록하기 버튼 누름");
    try {
      const result = await createClass({
        variables: {
          createClassInput: {
            title: data.title,
            content_summary: data.content_summary,
            price: Number(data.price),
            class_mNum: Number(data.class_mNum),
            // address: data.address,
            address: fulladdress,
            address_detail: data.address_detail,
            category: data.category,
            // address_category: data.address_category,
            address_category: "Gggg",

            total_time: data.total_time,
            content: data.content,
            accountNum: data.accountNum,
            accountName: data.accountName,
            bankName: data.bankName,
            classSchedulesInput: {
              // date: data.date,
              // remain: data.remain,
              date: "ddd",
              remain: 11,
            },
            imageInput: {
              url: "111",
              type: 1,
              is_main: 1,
            },
          },
        },
      });

      alert("클래스 등록에 성공하였습니다.");

      console.log(result);
      // 클래스 디테일 페이지로 이동
      const class_id = result.data?.createClass.class_id;
      void router.push(`/classPage/${class_id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  return { onClickClassSubmit };
};